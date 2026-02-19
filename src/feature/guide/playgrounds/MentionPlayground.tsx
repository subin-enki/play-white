import { useRef } from 'react';
import { useImageUpload } from '@/hooks';
import { WhiteEditor } from '@/ui';
import type { WhiteEditorRef } from '@0ffen/white-editor';
import { MINIMAL_TOOLBAR_ITEMS } from '@0ffen/white-editor';

const users = [
  { uuid: 1, name: 'White Lee', nickname: 'white' },
  { uuid: 2, name: 'Black Kim', nickname: 'black' },
  { uuid: 3, name: 'Gray Park', nickname: 'gray' },
  { uuid: 4, name: 'Blue Choi', nickname: 'blue' },
];

const defaultContent = `<p>안녕하세요 <span data-type="mention" data-id="1" data-label="white" data-mention-suggestion-char="@">@white</span> 님, <span data-type="mention" data-id="2" data-label="black" data-mention-suggestion-char="@">@black</span> 님! 이 문서를 확인해주세요.</p><p>@를 입력하면 멘션 드롭다운이 나타납니다.</p>`;

export default function MentionPlayground() {
  const editorRef = useRef<WhiteEditorRef>(null);
  const imageUpload = useImageUpload();

  return (
    <div className='border-border rounded-lg border'>
      <WhiteEditor
        ref={editorRef}
        content={defaultContent}
        toolbarItems={MINIMAL_TOOLBAR_ITEMS}
        extension={{
          mention: {
            data: users,
            id: 'uuid',
            label: 'nickname',
          },
          imageUpload,
        }}
        placeholder='@를 입력하여 멘션을 사용해보세요...'
        editorClassName='rounded-lg'
        contentClassName='min-h-[300px] rounded-lg'
      />
    </div>
  );
}
