import { useRef } from 'react';
import click3dImg from '@/assets/click-3d.png';
import { useImageUpload } from '@/hooks';
import { WhiteEditor } from '@/ui';
import type { WhiteEditorRef, JSONContent } from '@0ffen/white-editor';
import { MINIMAL_TOOLBAR_ITEMS } from '@0ffen/white-editor';

const defaultContent: JSONContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: '이미지 업로드를 테스트해보세요. 툴바의 이미지 버튼을 클릭하거나 이미지를 드래그 앤 드롭하세요.',
        },
      ],
    },
    {
      type: 'image',
      attrs: {
        src: click3dImg,
        alt: 'click-3d',
      },
    },
    {
      type: 'paragraph',
      content: [{ type: 'text', text: '' }],
    },
  ],
};

export default function ImageUploadPlayground() {
  const editorRef = useRef<WhiteEditorRef>(null);
  const imageUpload = useImageUpload();

  return (
    <div className='border-border rounded-lg border'>
      <WhiteEditor
        ref={editorRef}
        content={defaultContent}
        toolbarItems={MINIMAL_TOOLBAR_ITEMS}
        extension={{
          imageUpload,
        }}
        placeholder='Upload an image...'
        editorClassName='rounded-lg'
        contentClassName='min-h-[300px] rounded-lg'
      />
    </div>
  );
}
