# Page Mention

사용자 멘션과 함께 페이지 링크 멘션을 추가할 수 있습니다. `@`를 입력하면 사용자와 페이지가 함께 드롭다운에 표시됩니다.

## Setup

```tsx
const users = [
  { uuid: 1, name: 'White Lee', nickname: 'white' },
  { uuid: 2, name: 'Black Kim', nickname: 'black' },
  { uuid: 3, name: 'Gray Park', nickname: 'gray' },
  { uuid: 4, name: 'Blue Choi', nickname: 'blue' },
];

const pages = [
  { pageId: '1', title: 'Project Overview', url: '/pages/1', path: '/docs/project' },
  { pageId: '2', title: 'API Documentation', url: '/pages/2', path: '/docs/api' },
  { pageId: '3', title: 'Getting Started', url: '/pages/3', path: '/docs/getting-started' },
  { pageId: '4', title: 'Release Notes', url: '/pages/4', path: '/docs/release-notes' },
];

<WhiteEditor
  extension={{
    mention: {
      data: users,
      id: 'uuid',
      label: 'nickname',
    },
    pageMention: {
      data: pages,
      id: 'pageId',
      title: 'title',
      href: 'url',
      path: 'path',       // optional
      icon: 'icon',       // optional
    },
  }}
/>
```

## Page Mention Config

페이지 멘션의 설정 옵션입니다.

| Property | Type | Description |
| --- | --- | --- |
| `data` | `P[]` | 페이지 항목 배열 |
| `id` | `keyof P` | 고유 식별자 키 |
| `title` | `keyof P` | 표시 제목 키 |
| `href` | `keyof P` | 링크 URL 키 |
| `path` | `keyof P` | 경로 정보 (선택사항) |
| `icon` | `keyof P` | 아이콘 키 (선택사항) |
| `renderLabel` | `(item: P) => ReactNode` | 드롭다운 커스텀 렌더링 |
| `sectionLabel` | `string` | 섹션 헤더 텍스트 |
| `showSectionLabel` | `boolean` | 섹션 라벨 표시 여부 |

## Custom Rendering

```tsx
pageMention: {
  data: pages,
  id: 'pageId',
  title: 'title',
  href: 'url',
  renderLabel: (item) => (
    <div className="flex items-center gap-2">
      {item.icon && <img src={item.icon} alt="" />}
      <span>{item.title}</span>
    </div>
  ),
}
```
