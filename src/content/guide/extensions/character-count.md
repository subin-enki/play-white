# Character Count

글자 수 카운터를 표시하고, 선택적으로 글자 수 제한을 설정할 수 있습니다.

## Setup

```tsx
<WhiteEditor
  extension={{
    character: {
      show: true,
      limit: 1000,                    // 선택사항: 생략하면 카운트만 표시
      className: 'text-gray-600',     // 선택사항: 커스텀 스타일링
    },
  }}
/>
```

## Config

글자 수 카운터의 설정 옵션입니다.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `show` | `boolean` | — | 글자 수 카운터 표시 여부 |
| `limit` | `number` | — | 최대 글자 수 제한. 생략하면 카운트만 표시 |
| `className` | `string` | — | 카운터 요소의 CSS 클래스 |

## Without Limit

제한 없이 현재 글자 수만 표시합니다:

```tsx
extension={{
  character: {
    show: true,
  },
}}
```

## Reading Count via Ref

ref를 통해 현재 글자 수에 프로그래밍 방식으로 접근합니다:

```tsx
const count = editorRef.current?.charactersCount;
```
