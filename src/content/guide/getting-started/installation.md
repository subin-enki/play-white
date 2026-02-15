# Installation

White Editor는 **TipTap** 기반의 리치 텍스트 에디터입니다. TipTap은 ProseMirror를 기반으로 한 확장 가능한 헤드리스 에디터 프레임워크이며, React 컴포넌트, 테마, 다양한 내장 기능을 통해 즉시 사용 가능한 WYSIWYG 편집 환경을 제공합니다.

## Install

npm 레지스트리를 설정하고 패키지를 설치합니다:

```bash
npm config set @0ffen:registry=https://npm.pkg.github.com
pnpm install @0ffen/white-editor
```

## Entry Points

패키지는 용도에 따라 여러 진입점을 제공합니다:

| Entry Point | Description |
| --- | --- |
| `@0ffen/white-editor` | 메인 — Editor, Viewer, Theme, Types, Extensions, Toolbar 프리셋 |
| `@0ffen/white-editor/util` | 유틸리티 전용 — `getHtmlContent`, `createEmptyContent`, `checkEditorEmpty` 등 |
| `@0ffen/white-editor/editor` | Editor 컴포넌트만 포함 |
| `@0ffen/white-editor/viewer` | Viewer 컴포넌트만 포함 |

### Import Examples

```tsx
// 메인 진입점 (editor + viewer + theme + toolbar 프리셋)
import { WhiteEditor, WhiteViewer, WhiteEditorThemeProvider } from '@0ffen/white-editor';
import type { WhiteEditorRef, JSONContent } from '@0ffen/white-editor';

// 유틸리티
import { getHtmlContent, createEmptyContent, checkEditorEmpty } from '@0ffen/white-editor/util';

// Editor만
import { WhiteEditor } from '@0ffen/white-editor/editor';

// Viewer만
import { WhiteViewer } from '@0ffen/white-editor/viewer';
```

## Next.js / React 19 Support

모든 진입점에 `"use client"` 디렉티브가 포함되어 있어, Next.js App Router 및 React 19 환경에서 별도 설정 없이 정적 임포트로 바로 사용할 수 있습니다.

## Stack

- **TipTap** — 리치 텍스트 에디터 프레임워크 (ProseMirror 기반)
- **TUI Image Editor** — 이미지 편집 (자르기, 그리기, 도형, 텍스트)
- **React** + **TypeScript**
- **TailwindCSS** + **Shadcn UI** — 스타일링
- **Lucide React** — 아이콘
