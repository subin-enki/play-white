# Viewer — Usage & Options

`WhiteViewer`는 리치 텍스트 콘텐츠를 읽기 전용 모드로 렌더링합니다.

## Basic Usage

```tsx
import { WhiteViewer, type JSONContent } from '@0ffen/white-editor';

const content: JSONContent = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [{ type: 'text', text: 'Hello' }],
    },
    {
      type: 'paragraph',
      content: [{ type: 'text', text: 'Read-only content.' }],
    },
  ],
};

<WhiteViewer content={content} className="w-full" />;
```

## Props (WhiteViewerProps)

뷰어에 전달되는 props입니다.

| Prop | Type | Description |
| --- | --- | --- |
| `content` | `unknown` | JSONContent 또는 `{ content: JSONContent, html?: string }` 래퍼. 내부적으로 정규화됩니다. |
| `className` | `string` | 뷰어 컨테이너의 CSS 클래스 |
| `footer` | `ReactNode` | 뷰어 하단의 커스텀 콘텐츠 |
| `tableOfContents` | `boolean \| TableOfContentsConfig` | 제목 기반 목차 활성화 |
| `onHeadingsReady` | `(headings: HeadingItem[], scrollToIndex: (index: number) => void) => void` | 뷰어 외부에 커스텀 목차를 구성하기 위한 콜백 |

뷰어는 고급 렌더링 커스터마이징을 위해 `ExtensibleEditorConfig`(addExtensions, customNodes, overrideExtensions, customNodeViews)도 상속합니다.

## Table of Contents

내장 제목 기반 목차를 활성화합니다:

```tsx
// 간단하게 — 기본값 position: 'top'
<WhiteViewer content={content} tableOfContents />

// 설정 지정
<WhiteViewer
  content={content}
  tableOfContents={{ position: 'right', maxLevel: 3 }}
/>
```

### TableOfContentsConfig

목차의 설정 옵션입니다.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `position` | `'top' \| 'left' \| 'right'` | `'top'` | 목차 렌더링 위치 |
| `maxLevel` | `number` | — | 포함할 최대 제목 레벨 |

## External TOC (onHeadingsReady)

뷰어 외부에 완전히 커스텀한 목차를 구성합니다:

```tsx
function MyPage() {
  const [headings, setHeadings] = useState([]);
  const [scrollTo, setScrollTo] = useState(null);

  return (
    <div className="flex">
      <nav>
        {headings.map((h, i) => (
          <button key={i} onClick={() => scrollTo?.(h.index)}>
            {h.text}
          </button>
        ))}
      </nav>
      <WhiteViewer
        content={content}
        onHeadingsReady={(headings, scrollToIndex) => {
          setHeadings(headings);
          setScrollTo(() => scrollToIndex);
        }}
      />
    </div>
  );
}
```

### HeadingItem

```ts
interface HeadingItem {
  level: number;  // 제목 레벨 (1-6)
  text: string;   // 제목 텍스트
  index: number;  // scrollToIndex()에 사용되는 인덱스
}
```

## Footer

```tsx
<WhiteViewer
  content={content}
  footer={
    <div className="border-t p-2 text-sm text-gray-500">
      Last updated: 2025-01-15
    </div>
  }
/>
```
