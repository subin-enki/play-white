# Events & State

## Callback Props

에디터에서 사용 가능한 콜백 props입니다.

| Callback | Signature | Description |
| --- | --- | --- |
| `onChange` | `(jsonContent: JSONContent) => void` | 콘텐츠가 변경될 때 호출 |
| `onUpdate` | `(jsonContent: JSONContent) => void` | 실시간 콘텐츠 업데이트 시 호출 |
| `onFocus` | `(jsonContent: JSONContent) => void` | 에디터에 포커스될 때 호출 |
| `onBlur` | `(jsonContent: JSONContent) => void` | 에디터에서 포커스가 해제될 때 호출 |
| `onCreate` | `(editor: Editor) => void` | 에디터 인스턴스가 생성될 때 호출 |
| `onDestroy` | `() => void` | 에디터 인스턴스가 파괴될 때 호출 |
| `onSelectionUpdate` | `(editor: Editor) => void` | 선택 영역이 변경될 때 호출 |

```tsx
<WhiteEditor
  onChange={(content) => console.log('Changed:', content)}
  onFocus={() => console.log('Focused')}
  onBlur={() => console.log('Blurred')}
  onCreate={(editor) => console.log('Created', editor)}
/>
```

## Empty State Detection

에디터가 비어있는지 확인하는 세 가지 방법이 있습니다.

### 1. onEmptyChange Callback (권장)

빈 상태가 변경될 때마다 호출됩니다. 제출 버튼 상태 제어에 적합합니다.

```tsx
import { useState } from 'react';
import { WhiteEditor } from '@0ffen/white-editor';

function FormWithEditor() {
  const [editorEmpty, setEditorEmpty] = useState(true);

  return (
    <WhiteEditor
      onEmptyChange={setEditorEmpty}
      emptyCheckDebounceMs={200}
      footer={
        <button type="submit" disabled={editorEmpty}>
          Submit
        </button>
      }
    />
  );
}
```

빈 상태 감지 관련 props입니다.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onEmptyChange` | `(isEmpty: boolean) => void` | — | 빈 상태가 토글될 때 호출 |
| `emptyCheckDebounceMs` | `number` | `200` | 디바운스 간격(ms). 즉시 확인하려면 `0`으로 설정 |

### 2. ref.current.isEmpty

ref를 통해 현재 빈 상태를 읽습니다. 마운트 후에만 사용 가능하며, 이벤트 핸들러나 `useEffect`에서 사용하세요 (렌더링 중에는 사용 불가).

```tsx
const handleSubmit = () => {
  if (editorRef.current?.isEmpty) {
    alert('내용을 입력해주세요.');
    return;
  }
  // 제출 진행
};
```

### 3. checkEditorEmpty Utility

저장된 에디터 필드(예: 서버의 폼 데이터)를 확인할 때 사용합니다. JSON 구조를 검사하여 텍스트 없이 이미지/코드 블록만 있는 경우도 비어있지 않은 것으로 감지합니다.

```tsx
import { checkEditorEmpty } from '@0ffen/white-editor/util';

// 저장된 필드 확인
if (checkEditorEmpty(formData.body)) {
  setError('내용을 입력해주세요.');
}

// ref를 통해 현재 에디터 콘텐츠 확인
const isEmpty = editorRef.current
  ? checkEditorEmpty({ content: editorRef.current.getJSON() })
  : true;
```
