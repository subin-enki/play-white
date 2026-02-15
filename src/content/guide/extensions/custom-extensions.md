# Custom Extensions

White Editor는 **TipTap** 기반으로 구축되어 확장 가능한 아키텍처를 제공합니다. 외부 TipTap 익스텐션 추가, 커스텀 노드 생성, 내장 익스텐션 설정 오버라이드, 커스텀 React 컴포넌트를 노드에 매핑하는 것이 가능합니다.

## addExtensions — External TipTap Extensions

White Editor에 포함되지 않은 TipTap 익스텐션을 추가합니다:

```tsx
import { Extension } from '@tiptap/core';
import CustomExtension from '@tiptap/extension-custom';

<WhiteEditor
  addExtensions={[
    CustomExtension.configure({ /* options */ }),
  ]}
/>
```

## customNodes — Custom Node Types

`Node.create()`로 생성한 노드를 추가합니다:

```tsx
import { Node } from '@tiptap/core';

const CustomNode = Node.create({
  name: 'customNode',
  group: 'block',
  content: 'inline*',
  // ... node spec
});

<WhiteEditor customNodes={[CustomNode]} />
```

## overrideExtensions — Override Built-in Settings

내장 익스텐션의 설정을 오버라이드합니다:

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

키는 익스텐션 이름(예: `heading`, `link`, `image`)이고, 값은 configure 옵션 객체입니다.

## customNodeViews — Custom React Components

노드 타입을 커스텀 React 컴포넌트에 매핑하여 렌더링합니다:

```tsx
import CustomCodeBlock from './CustomCodeBlock';

<WhiteEditor
  customNodeViews={{
    codeBlock: CustomCodeBlock,
  }}
/>
```

### Custom Node View Component

```tsx
import { NodeViewWrapper } from '@tiptap/react';
import type { NodeViewProps } from '@tiptap/react';

const CustomCodeBlock: React.FC<NodeViewProps> = ({ node }) => {
  return (
    <NodeViewWrapper className="custom-code-block">
      <pre>
        <code>{node.textContent}</code>
      </pre>
    </NodeViewWrapper>
  );
};

export default CustomCodeBlock;
```

## Combined Example

```tsx
import { Extension, Node } from '@tiptap/core';
import CustomExtension from '@tiptap/extension-custom';

const CustomNode = Node.create({ name: 'customNode', /* ... */ });

<WhiteEditor
  addExtensions={[CustomExtension]}
  customNodes={[CustomNode]}
  overrideExtensions={{
    heading: { levels: [1, 2] },
  }}
  customNodeViews={{
    codeBlock: CustomCodeBlock,
  }}
/>
```
