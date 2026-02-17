# Complete Example

ThemeProvider, 익스텐션, 콜백, footer, 빈 상태 관리 등 주요 기능을 모두 사용하는 종합 예제입니다.

```tsx
import { useRef, useState } from 'react';
import {
  WhiteEditor,
  WhiteEditorThemeProvider,
  type WhiteEditorRef,
} from '@0ffen/white-editor';
import { createEmptyContent } from '@0ffen/white-editor/util';
import type { JSONContent } from '@tiptap/react';

interface User {
  userId: string;
  username: string;
  displayName: string;
}

interface Page {
  pageId: string;
  title: string;
  url: string;
  path?: string;
}

function CompleteExample() {
  const editorRef = useRef<WhiteEditorRef>(null);
  const [editorEmpty, setEditorEmpty] = useState(true);

  const users: User[] = [
    { userId: '1', username: 'white', displayName: 'White Lee' },
    { userId: '2', username: 'black', displayName: 'Black Kim' },
  ];

  const pages: Page[] = [
    { pageId: '1', title: 'Project Overview', url: '/pages/1', path: '/docs/project' },
    { pageId: '2', title: 'API Documentation', url: '/pages/2', path: '/docs/api' },
  ];

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await response.json();
    return data.url;
  };

  return (
    <WhiteEditorThemeProvider
      theme={{
        mode: 'dark',
        colors: {
          textNormal: 'var(--color-text-normal)',
          textPlaceholder: 'var(--color-text-placeholder)',
          elevationBackground: 'var(--color-elevation-background)',
          elevationLevel1: 'var(--color-elevation-level1)',
          elevationDropdown: 'var(--color-elevation-dropdown)',
          brandDefault: 'var(--color-brand-default)',
          brandWeak: 'var(--color-brand-weak)',
        },
        zIndex: {
          toolbar: 10,
          inline: 10,
          handle: 10,
          overlay: 10,
          floating: 20,
        },
      }}
    >
      <WhiteEditor
        ref={editorRef}
        locale="ko"
        showToolbar={true}
        placeholder="Type here..."
        editorClassName="!rounded-xs !border"
        contentClassName="min-h-[500px] p-4"
        disabled={false}
        toolbarItems={[
          ['undo', 'redo'],
          ['heading', 'bold', 'italic', 'underline'],
          ['link', 'image'],
        ]}
        toolbarProps={{
          heading: {
            options: [
              { label: 'Normal', level: null },
              { label: 'Heading 1', level: 1 },
              { label: 'Heading 2', level: 2 },
            ],
          },
        }}
        extension={{
          mention: {
            data: users,
            id: 'userId',
            label: 'username',
          },
          pageMention: {
            data: pages,
            id: 'pageId',
            title: 'title',
            href: 'url',
            path: 'path',
          },
          character: {
            show: true,
            limit: 2000,
            className: 'text-gray-600',
          },
          imageUpload: {
            upload: handleImageUpload,
            maxSize: 1024 * 1024 * 10,
            accept: 'image/*',
            limit: 1,
            onSuccess: (url) => console.log('Uploaded:', url),
            onError: (error) => console.error('Failed:', error),
          },
        }}
        onEmptyChange={setEditorEmpty}
        emptyCheckDebounceMs={200}
        onChange={(content: JSONContent) => console.log('Changed:', content)}
        onFocus={() => console.log('Focused')}
        onBlur={() => console.log('Blurred')}
        onCreate={() => {
          editorRef.current?.setContent(createEmptyContent());
        }}
        footer={
          <button
            disabled={editorEmpty}
            onClick={() => console.log(editorRef.current?.getJSON())}
          >
            Save
          </button>
        }
      />
    </WhiteEditorThemeProvider>
  );
}
```
