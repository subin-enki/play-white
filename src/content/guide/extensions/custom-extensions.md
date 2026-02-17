# Custom Extensions

White Editor는 **TipTap** 기반으로 구축되어 확장 가능한 아키텍처를 제공합니다. 4가지 메커니즘을 통해 에디터를 자유롭게 확장할 수 있습니다.

## Overview

| Prop | 용도 | 예시 |
| --- | --- | --- |
| `addExtensions` | 외부 TipTap 익스텐션 추가 | 키보드 단축키, 외부 플러그인 |
| `customNodes` | 커스텀 노드 타입 생성 | Video Embed, Callout 블록 |
| `overrideExtensions` | 내장 익스텐션 설정 변경 | heading levels, link 동작 |
| `customNodeViews` | 노드에 React 컴포넌트 매핑 | 커스텀 코드블록, 비디오 플레이어 |

## addExtensions

White Editor에 포함되지 않은 외부 TipTap 익스텐션을 배열로 전달합니다:

```tsx
import { Extension } from '@tiptap/core';
import CustomExtension from '@tiptap/extension-custom';

<WhiteEditor
  addExtensions={[
    CustomExtension.configure({ /* options */ }),
  ]}
/>
```

## customNodes

`Node.create()`로 커스텀 노드 타입을 정의하고 에디터에 등록합니다. 아래는 Video Embed 노드의 예시입니다:

```tsx
import { Node, mergeAttributes } from '@tiptap/core';

const VideoEmbed = Node.create({
  name: 'videoEmbed',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      src: { default: null },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-video-embed]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-video-embed': '' }, HTMLAttributes)];
  },

  addCommands() {
    return {
      setVideoEmbed:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs }),
    };
  },
});

<WhiteEditor customNodes={[VideoEmbed]} />
```

### Node 정의 주요 속성

| Property | Description |
| --- | --- |
| `name` | 노드 고유 이름 |
| `group` | 노드 그룹 (`block`, `inline` 등) |
| `atom` | `true`이면 내부에 편집 가능한 콘텐츠 없음 |
| `addAttributes()` | 노드의 속성 정의 (src, width 등) |
| `parseHTML()` | HTML -> 노드 변환 규칙 |
| `renderHTML()` | 노드 -> HTML 변환 규칙 |
| `addCommands()` | 에디터 커맨드 정의 (삽입, 삭제 등) |
| `addNodeView()` | React 컴포넌트 연결 (아래 customNodeViews 참조) |

## customNodeViews

노드 타입을 커스텀 React 컴포넌트에 매핑하여 렌더링합니다. `NodeViewWrapper`와 `ReactNodeViewRenderer`를 사용합니다.

### React 컴포넌트 정의

```tsx
import { NodeViewWrapper } from '@tiptap/react';
import type { NodeViewProps } from '@tiptap/react';

const VideoEmbedView: React.FC<NodeViewProps> = ({ node, selected }) => {
  const { src } = node.attrs;

  return (
    <NodeViewWrapper>
      <div style={{
        position: 'relative',
        paddingBottom: '56.25%',
        border: selected ? '2px solid var(--primary)' : '2px solid transparent',
        borderRadius: 8,
        overflow: 'hidden',
      }}>
        <iframe
          src={src}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
          allowFullScreen
        />
      </div>
    </NodeViewWrapper>
  );
};
```

### 연결 방법 1: Node 내부에서 addNodeView()

노드 정의 안에 직접 연결합니다. 노드와 뷰가 하나의 단위로 관리됩니다:

```tsx
import { ReactNodeViewRenderer } from '@tiptap/react';

const VideoEmbed = Node.create({
  name: 'videoEmbed',
  // ... 기본 정의 ...

  addNodeView() {
    return ReactNodeViewRenderer(VideoEmbedView);
  },
});

<WhiteEditor customNodes={[VideoEmbed]} />
```

### 연결 방법 2: customNodeViews prop으로 분리

노드 정의와 뷰를 분리하여 전달합니다. 동일한 노드에 다른 뷰를 적용하고 싶을 때 유용합니다:

```tsx
<WhiteEditor
  customNodes={[VideoEmbed]}
  customNodeViews={{
    videoEmbed: VideoEmbedView,
  }}
/>
```

## overrideExtensions

내장 익스텐션의 설정을 오버라이드합니다. 키는 익스텐션 이름이고, 값은 `configure` 옵션 객체입니다:

```tsx
<WhiteEditor
  overrideExtensions={{
    heading: {
      levels: [1, 2, 3],
    },
    link: {
      openOnClick: false,
    },
  }}
/>
```

## Viewer에서의 사용

`WhiteViewer`도 동일한 확장 설정을 지원합니다. 에디터에서 작성한 커스텀 노드 콘텐츠를 뷰어에서 올바르게 렌더링하려면, 동일한 `customNodes`를 전달하세요:

```tsx
<WhiteViewer
  content={jsonContent}
  customNodes={[VideoEmbed]}
/>
```

## Complete Example

```tsx
import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import type { NodeViewProps } from '@tiptap/react';

// 1. NodeView 컴포넌트 정의
const VideoEmbedView: React.FC<NodeViewProps> = ({ node, selected }) => (
  <NodeViewWrapper>
    <div style={{
      position: 'relative',
      paddingBottom: '56.25%',
      border: selected ? '2px solid var(--primary)' : '2px solid transparent',
      borderRadius: 8,
      overflow: 'hidden',
    }}>
      <iframe
        src={node.attrs.src}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
        allowFullScreen
      />
    </div>
  </NodeViewWrapper>
);

// 2. 커스텀 노드 정의
const VideoEmbed = Node.create({
  name: 'videoEmbed',
  group: 'block',
  atom: true,
  addAttributes() {
    return { src: { default: null } };
  },
  parseHTML() {
    return [{ tag: 'div[data-video-embed]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-video-embed': '' }, HTMLAttributes)];
  },
  addNodeView() {
    return ReactNodeViewRenderer(VideoEmbedView);
  },
});

// 3. 에디터에 등록
<WhiteEditor
  customNodes={[VideoEmbed]}
  overrideExtensions={{
    heading: { levels: [1, 2, 3] },
  }}
/>

// 4. 뷰어에서도 동일하게 사용
<WhiteViewer
  content={savedContent}
  customNodes={[VideoEmbed]}
/>
```
