# Toolbar

## Show / Hide

`showToolbar`로 툴바를 표시하거나 숨길 수 있습니다

```tsx
<WhiteEditor showToolbar={false} placeholder="Simple input without toolbar." />
```

## Toolbar Presets

세 가지 프리셋 설정을 제공합니다:

| Preset | Description |
| --- | --- |
| `WHITE_EDITOR_TOOLBAR_ITEMS` | **Full** — undo/redo, heading, lists, blockquote, marks, color, highlight, text align, codeblock, math, link, table, image 등 모든 버튼 포함 |
| `DEFAULT_TOOLBAR_ITEMS` | **Default** — Heading, color, highlight, link, code/codeblock, blockquote, lists, table, image, text align |
| `MINIMAL_TOOLBAR_ITEMS` | **Minimal** — Heading, color, blockquote, lists, table, image, text align만 포함 |

```tsx
import {
  WhiteEditor,
  WHITE_EDITOR_TOOLBAR_ITEMS,
  DEFAULT_TOOLBAR_ITEMS,
  MINIMAL_TOOLBAR_ITEMS,
} from '@0ffen/white-editor';

<WhiteEditor toolbarItems={WHITE_EDITOR_TOOLBAR_ITEMS} />
<WhiteEditor toolbarItems={DEFAULT_TOOLBAR_ITEMS} />
<WhiteEditor toolbarItems={MINIMAL_TOOLBAR_ITEMS} />
```

## Custom Toolbar Items

툴바 버튼을 2차원 배열로 정의합니다. 각 내부 배열은 구분선으로 분리되는 시각적 그룹입니다

```tsx
<WhiteEditor
  toolbarItems={[
    ['undo', 'redo'],
    ['heading', 'bold', 'italic', 'color'],
    ['link', 'image', 'table'],
  ]}
/>
```

### Available Toolbar Items

`undo`, `redo`, `heading`, `bold`, `italic`, `underline`, `strike`, `code`, `superscript`, `subscript`, `color`, `highlight`, `link`, `table`, `inlineMath`, `blockMath`, `image`, `textAlignLeft`, `textAlignCenter`, `textAlignRight`, `textAlignJustify`, `bulletList`, `orderedList`, `taskList`, `blockquote`, `codeblock`

## Toolbar Props (toolbarProps)

`toolbarProps`를 사용하여 개별 툴바 버튼을 커스터마이징할 수 있습니다

### Heading Dropdown

```tsx
toolbarProps={{
  heading: {
    options: [
      { label: 'Normal Text', level: null },
      { label: 'Heading 1', level: 1 },
      { label: 'Heading 2', level: 2 },
    ],
    icon: <HeaderIcon />,
    triggerClassName: 'w-20',
    contentClassName: 'min-w-32',
  },
}}
```

### Image Upload Button

```tsx
toolbarProps={{
  image: {
    maxSize: 1024 * 1024 * 10, // 10MB (기본값: 5MB)
    accept: 'image/*',
    upload: async (file) => uploadedImageUrl,
    onSuccess: (url) => console.log(url),
    onError: (error) => console.error(error),
    closeOnError: true,
  },
}}
```

### Mark Buttons (Bold, Italic, etc.)

```tsx
toolbarProps={{
  bold: {
    icon: <BoldIcon />,
    className: 'my-bold-button',
  },
}}
```
