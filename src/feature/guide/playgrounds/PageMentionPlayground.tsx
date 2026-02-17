import { useRef } from 'react';
import { WhiteEditor } from '@/ui';
import type { WhiteEditorRef, JSONContent } from '@0ffen/white-editor';
import { MINIMAL_TOOLBAR_ITEMS } from '@0ffen/white-editor';

const users = [
  { uuid: 1, name: 'White Lee', nickname: 'white' },
  { uuid: 2, name: 'Black Kim', nickname: 'black' },
  { uuid: 3, name: 'Gray Park', nickname: 'gray' },
  { uuid: 4, name: 'Blue Choi', nickname: 'blue' },
];

const pages = [
  { pageId: '1', title: 'Project Overview', url: '/pages/1', path: '/docs/project' },
  { pageId: '2', title: 'API Documentation', url: '/pages/2', path: '/docs/api' },
  { pageId: '3', title: 'Getting Started', url: '/pages/3', path: '/docs/getting-started' },
  { pageId: '4', title: 'Release Notes', url: '/pages/4', path: '/docs/release-notes' },
];

const defaultContent: JSONContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        { type: 'mention', attrs: { id: '1', label: 'white' } },
        { type: 'text', text: ' 님, ' },
        { type: 'pageMention', attrs: { id: '1', label: 'Project Overview', value: '/pages/1' } },
        { type: 'text', text: ' 페이지를 확인해주세요.' },
      ],
    },
    {
      type: 'paragraph',
      content: [{ type: 'text', text: '@를 입력하면 사용자 멘션과 페이지 멘션이 함께 나타납니다.' }],
    },
  ],
};

export default function PageMentionPlayground() {
  const editorRef = useRef<WhiteEditorRef>(null);

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
          pageMention: {
            data: pages,
            id: 'pageId',
            title: 'title',
            href: 'url',
            path: 'path',
          },
        }}
        placeholder='@를 입력하여 멘션과 페이지 멘션을 사용해보세요...'
        editorClassName='rounded-lg'
        contentClassName='min-h-[300px] rounded-lg'
      />
    </div>
  );
}
