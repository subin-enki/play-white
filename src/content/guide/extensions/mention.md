# Mention

`@`를 입력하면 멘션 드롭다운이 나타나 사용자를 태그할 수 있습니다.

## Setup

```tsx
const users = [
  { uuid: 1, name: 'White Lee', nickname: 'white' },
  { uuid: 2, name: 'Black Kim', nickname: 'black' },
  { uuid: 3, name: 'Gray Park', nickname: 'gray' },
  { uuid: 4, name: 'Blue Choi', nickname: 'blue' },
];

<WhiteEditor
  extension={{
    mention: {
      data: users,
      id: 'uuid',
      label: 'nickname',
    },
  }}
/>
```

## MentionConfig

멘션의 설정 옵션입니다.

| Property | Type | Description |
| --- | --- | --- |
| `data` | `T[] \| null` | 멘션 가능한 항목 배열 |
| `id` | `string` | 각 항목의 고유 식별자 키 |
| `label` | `string` | 각 항목의 표시 텍스트 키 |
| `renderLabel` | `(item: T) => ReactNode` | 드롭다운 항목의 커스텀 렌더링 (선택사항) |
| `sectionLabel` | `string` | 섹션 헤더 텍스트 (선택사항) |
| `showSectionLabel` | `boolean` | 섹션 라벨 표시 여부 |

## Custom Render

```tsx
extension={{
  mention: {
    data: users,
    id: 'uuid',
    label: 'nickname',
    renderLabel: (user) => (
      <div className="flex items-center gap-2">
        <img src={user.avatar} className="h-5 w-5 rounded-full" />
        <span>{user.name}</span>
      </div>
    ),
  },
}}
```
