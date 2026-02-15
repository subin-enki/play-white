# Quick Start

## React

```tsx
import { useRef } from 'react';
import { WhiteEditor, WhiteEditorThemeProvider, type WhiteEditorRef } from '@0ffen/white-editor';

function MyEditor() {
  const editorRef = useRef<WhiteEditorRef>(null);

  return (
    <WhiteEditorThemeProvider theme="light">
      <WhiteEditor ref={editorRef} placeholder="Start typing..." />
    </WhiteEditorThemeProvider>
  );
}
```

## Next.js (App Router)

```tsx
'use client';

import { useRef } from 'react';
import { WhiteEditor, WhiteEditorThemeProvider, type WhiteEditorRef } from '@0ffen/white-editor';

export default function EditorPage() {
  const editorRef = useRef<WhiteEditorRef>(null);

  return (
    <WhiteEditorThemeProvider theme="dark">
      <WhiteEditor ref={editorRef} placeholder="Start typing..." />
    </WhiteEditorThemeProvider>
  );
}
```

## What You Get

기본 제공 기능은 다음과 같습니다:

- **Toolbar** — 제목, 굵게, 기울임, 밑줄, 취소선, 코드, 리스트, 인용, 링크, 표, 이미지, 색상, 하이라이트, 텍스트 정렬, 수식, 실행 취소/다시 실행
- **Markdown shortcuts** — `#`으로 제목, `-`로 리스트, `>`로 인용 등 마크다운 단축키 지원
- **Image editor** — 자르기, 그리기, 도형, 텍스트 오버레이
- **Dark/Light theme** 지원
- **i18n** — 한국어(기본), 영어, 스페인어

## Next Steps

- [Editor > Usage & Props](/guide/editor/usage-and-props) — placeholder, footer, locale 등 설정
- [Editor > Toolbar](/guide/editor/toolbar) — 툴바 프리셋 및 항목 커스터마이징
- [Theme](/guide/theme/customization) — 색상 및 z-index 커스터마이징
