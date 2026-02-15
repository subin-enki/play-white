# Usage & Props

## Basic Usage

### React

```tsx
import { useRef } from 'react';
import { WhiteEditor, type WhiteEditorRef } from '@0ffen/white-editor';

function MyComponent() {
  const editorRef = useRef<WhiteEditorRef | null>(null);

  return <WhiteEditor ref={editorRef} />;
}
```

### Next.js (App Router)

```tsx
'use client';

import { useRef } from 'react';
import { WhiteEditor, type WhiteEditorRef } from '@0ffen/white-editor';

export default function Home() {
  const editorRef = useRef<WhiteEditorRef>(null);

  return <WhiteEditor ref={editorRef} />;
}
```

## UI Props (WhiteEditorUIProps)

에디터에 전달되는 props입니다


| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `placeholder` | `string` | — | 에디터가 비어있을 때 표시되는 플레이스홀더 텍스트 |
| `disabled` | `boolean` | `false` | 에디터를 비활성화합니다 |
| `showToolbar` | `boolean` | `true` | 툴바 표시 여부 |
| `footer` | `ReactNode` | — | 에디터 하단에 렌더링되는 커스텀 콘텐츠 |
| `locale` | `'ko' \| 'en' \| 'es'` | `'ko'` | UI 언어 (한국어, 영어, 스페인어) |
| `editorClassName` | `string` | — | 에디터 컨테이너의 CSS 클래스 |
| `contentClassName` | `string` | — | 콘텐츠 영역의 CSS 클래스 |
| `toolbarItems` | `ToolbarItem[][]` | `DEFAULT_TOOLBAR_ITEMS` | 툴바 버튼 그룹 |
| `toolbarProps` | `ToolbarItemProps` | — | 툴바 버튼별 개별 설정 |

## TipTap Editor Options

TipTap 에디터에 전달되는 props입니다

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `content` | `Content` | — | 초기 콘텐츠 |
| `autofocus` | `boolean \| 'start' \| 'end' \| number` | — | 마운트 시 자동 포커스 |
| `boolean` | `true` | 콘텐츠 편집 가능 여부 |
| `editorProps` | `EditorProps` | — | ProseMirror EditorProps |

## Footer

`footer` prop은 모든 `ReactNode`를 받아 에디터 콘텐츠 영역 아래에 렌더링합니다. 제출 버튼, 글자 수 표시, 상태 표시 등에 활용할 수 있습니다.

```tsx
<WhiteEditor
  footer={
    <div className="flex justify-end border-t p-2">
      <button type="submit">Save</button>
    </div>
  }
/>
```

## Locale (i18n)

`locale` prop으로 에디터 UI 언어를 변경할 수 있습니다

```tsx
<WhiteEditor locale={currentLocale} />
```


```tsx
// 한국어 (기본값)
<WhiteEditor locale="ko" placeholder="내용을 입력하세요." />

// 영어
<WhiteEditor locale="en" placeholder="Enter your content." />

// 스페인어
<WhiteEditor locale="es" placeholder="Ingrese su contenido." />
```


