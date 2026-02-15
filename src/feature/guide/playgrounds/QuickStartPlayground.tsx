import { useRef } from 'react';
import { WhiteEditor } from '@/ui';
import type { WhiteEditorRef } from '@0ffen/white-editor';

export default function QuickStartPlayground() {
  const editorRef = useRef<WhiteEditorRef>(null);

  return (
    <div className='border-border rounded-lg border'>
      <WhiteEditor
        ref={editorRef}
        placeholder='Type something here...'
        editorClassName='!rounded-lg'
        contentClassName='min-h-[300px] p-4'
      />
    </div>
  );
}
