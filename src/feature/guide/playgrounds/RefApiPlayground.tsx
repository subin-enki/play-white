import { useRef, useState } from 'react';
import { useImageUpload } from '@/hooks';
import { cn } from '@/lib/utils';
import { WhiteEditor } from '@/ui';
import type { WhiteEditorRef } from '@0ffen/white-editor';

const btnClass =
  'rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground transition-all hover:border-foreground/20 hover:text-foreground';

const METHOD_GROUPS: { label: string; items: string[] }[] = [
  { label: 'Getters', items: ['getJSON()', 'getHTML()', 'getText()'] },
  { label: 'Control', items: ['setContent()', 'focus()', 'blur()', 'clear()'] },
];

export default function RefApiPlayground() {
  const editorRef = useRef<WhiteEditorRef>(null);
  const imageUpload = useImageUpload();
  const [output, setOutput] = useState<{ label: string; data: string } | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [charCount, setCharCount] = useState(0);

  const handleGetJSON = () => {
    const json = editorRef.current?.getJSON();
    setOutput({ label: 'getJSON()', data: JSON.stringify(json, null, 2) });
  };

  const handleGetHTML = () => {
    const html = editorRef.current?.getHTML() ?? '';
    setOutput({ label: 'getHTML()', data: html });
  };

  const handleGetText = () => {
    const text = editorRef.current?.getText() ?? '';
    setOutput({ label: 'getText()', data: text });
  };

  const handleSetContent = () => {
    editorRef.current?.setContent({
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'Content set via setContent()' }],
        },
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'This content was programmatically inserted using the ref API.' }],
        },
      ],
    });
  };

  const handleFocus = () => editorRef.current?.focus();
  const handleBlur = () => editorRef.current?.blur();
  const handleClear = () => editorRef.current?.clear();

  const handlers: Record<string, () => void> = {
    'getJSON()': handleGetJSON,
    'getHTML()': handleGetHTML,
    'getText()': handleGetText,
    'setContent()': handleSetContent,
    'focus()': handleFocus,
    'blur()': handleBlur,
    'clear()': handleClear,
  };

  return (
    <div className='flex flex-col gap-4'>
      {/* Controls */}
      <div className='border-border flex flex-col gap-5 rounded-xl border p-5'>
        {/* Status */}
        <div className='flex flex-col gap-2.5'>
          <span className='text-accent-foreground text-xs font-medium tracking-wide uppercase'>Status</span>
          <div className='text-muted-foreground flex items-center gap-4 text-sm'>
            <span>
              isEmpty:{' '}
              <code
                className={cn(
                  'rounded px-1',
                  isEmpty ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                )}
              >
                {String(isEmpty)}
              </code>
            </span>
            <span>
              charactersCount: <code className='rounded bg-blue-500/10 px-1 text-blue-500'>{charCount}</code>
            </span>
          </div>
        </div>

        {/* Methods */}
        <div className='flex flex-col gap-3'>
          <span className='text-accent-foreground text-xs font-medium tracking-wide uppercase'>Methods</span>
          <div className='flex flex-col gap-3'>
            {METHOD_GROUPS.map(({ label, items }) => (
              <div key={label} className='flex flex-col gap-1.5'>
                <span className='text-muted-foreground text-xs font-medium'>{label}</span>
                <div className='flex flex-wrap gap-1.5'>
                  {items.map((name) => (
                    <button key={name} type='button' onClick={handlers[name]} className={btnClass}>
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className='border-border rounded-lg border'>
        <WhiteEditor
          ref={editorRef}
          extension={{ imageUpload }}
          placeholder='Type something, then try the buttons above...'
          editorClassName='rounded-lg'
          contentClassName='min-h-[200px] rounded-lg'
          emptyCheckDebounceMs={0}
          onEmptyChange={setIsEmpty}
          onUpdate={() => {
            setTimeout(() => {
              setCharCount(editorRef.current?.charactersCount ?? 0);
            }, 0);
          }}
        />
      </div>

      {/* Output */}
      {output && (
        <div className='flex flex-col gap-2'>
          <span className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>Output</span>
          <div className='border-border flex flex-col gap-2 rounded-xl border p-5'>
            <span className='text-sm font-medium'>{output.label}</span>
            <pre className='bg-muted max-h-[300px] overflow-auto rounded-lg p-4 text-xs'>{output.data}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
