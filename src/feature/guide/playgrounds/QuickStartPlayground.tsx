import { useRef } from 'react';
import { useImageUpload } from '@/hooks';
import { WhiteEditor } from '@/ui';
import type { WhiteEditorRef } from '@0ffen/white-editor';

export default function QuickStartPlayground() {
  const editorRef = useRef<WhiteEditorRef>(null);
  const imageUpload = useImageUpload();

  return (
    <div className='border-border rounded-lg border'>
      <WhiteEditor
        ref={editorRef}
        extension={{ imageUpload }}
        placeholder='Type something here...'
        editorClassName='rounded-lg'
        contentClassName='min-h-[300px] rounded-lg'
      />
    </div>
  );
}
