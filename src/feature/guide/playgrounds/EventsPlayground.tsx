import { useRef, useState, useCallback } from 'react';
import { WhiteEditor } from '@/ui';
import { Button } from '@/ui';
import type { WhiteEditorRef } from '@0ffen/white-editor';

interface LogEntry {
  id: number;
  event: string;
  time: string;
}

let logId = 0;

export default function EventsPlayground() {
  const editorRef = useRef<WhiteEditorRef>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [editorEmpty, setEditorEmpty] = useState(true);
  const [count, setCount] = useState(0);

  const addLog = useCallback((event: string) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, fractionalSecondDigits: 2 });
    setLogs((prev) => [{ id: ++logId, event, time }, ...prev].slice(0, 50));
  }, []);

  const clearLogs = () => setLogs([]);

  return (
    <div className='flex flex-col gap-4'>
      {/* Editor with callbacks */}
      <div className='border-border rounded-lg border'>
        <WhiteEditor
          ref={editorRef}
          placeholder='Type, click, and focus to see events...'
          editorClassName='rounded-lg'
          contentClassName='min-h-[200px]'
          onChange={() => addLog('onChange')}
          onUpdate={() => {
            setTimeout(() => {
              setCount(editorRef.current?.charactersCount ?? 0);
            }, 0);
            addLog('onUpdate');
          }}
          onFocus={() => addLog('onFocus')}
          onBlur={() => addLog('onBlur')}
          onCreate={() => addLog('onCreate')}
          onSelectionUpdate={() => addLog('onSelectionUpdate')}
          onEmptyChange={(isEmpty) => {
            setEditorEmpty(isEmpty);
            addLog(`onEmptyChange(${isEmpty})`);
          }}
          emptyCheckDebounceMs={200}
          footer={
            <div className='border-border flex items-center justify-between border-t px-4 py-2'>
              <div className='flex items-center gap-2'>
                <span className='text-muted-foreground text-xs'>
                  isEmpty: <code className='bg-muted rounded px-1'>{String(editorEmpty)}</code>
                </span>
                <span className='text-muted-foreground text-xs'>
                  Count:
                  <code className='bg-muted rounded px-1'>{String(count)}</code>
                </span>
              </div>
              <Button size='sm' disabled={editorEmpty}>
                Submit
              </Button>
            </div>
          }
        />
      </div>

      {/* Event log */}
      <div className='flex w-full flex-col gap-2'>
        <div className='flex w-full flex-col gap-1'>
          <div className='flex w-full items-center justify-between'>
            <h3 className='text-sm font-medium'>Event Log</h3>
            <Button variant='ghost' size='sm' onClick={clearLogs}>
              Clear
            </Button>
          </div>
        </div>
        <div className='border-border bg-background relative max-h-[200px] overflow-y-auto rounded-lg border p-3 font-mono text-xs'>
          {logs.length === 0 ? (
            <span className='text-muted-foreground'>No events yet. Interact with the editor above.</span>
          ) : (
            logs.map((log) => (
              <div key={log.id} className='flex gap-2'>
                <span className='text-muted-foreground'>{log.time}</span>
                <span>{log.event}</span>
              </div>
            ))
          )}
        </div>
        <span className='text-muted-foreground text-right text-xs'>logTime / event</span>
      </div>
    </div>
  );
}
