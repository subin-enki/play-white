# Minimal Example

툴바 없이 글자 수 카운트만 표시하는 간단한 에디터입니다.

```tsx
import { WhiteEditor } from '@0ffen/white-editor';

<WhiteEditor
  showToolbar={false}
  placeholder="Type here..."
  extension={{
    character: {
      show: true,
      limit: 500,
    },
  }}
/>
```

댓글, 짧은 입력 필드 등 전체 툴바 없이 가벼운 리치 텍스트 입력이 필요한 곳에 유용합니다.
