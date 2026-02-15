# Ref API

ref를 사용하여 에디터에 접근할 수 있습니다.

## Setup
---

```tsx
import { useRef } from 'react';
import { WhiteEditor, type WhiteEditorRef } from '@0ffen/white-editor';

function MyComponent() {
  const editorRef = useRef<WhiteEditorRef>(null);

  return <WhiteEditor ref={editorRef} />;
}
```

## WhiteEditorRef Methods & Properties

 Methods & Properties

| Member | Type | Description |
| --- | --- | --- |
| `editor` | `Editor \| null` | TipTap Editor 인스턴스에 직접 접근 |
| `getJSON()` | `() => JSONContent` | 콘텐츠를 JSON으로 가져오기 |
| `getHTML()` | `() => string` | 콘텐츠를 HTML 문자열로 가져오기 |
| `getText()` | `() => string` | 콘텐츠를 일반 텍스트로 가져오기 |
| `setContent(content)` | `(content: string \| JSONContent) => void` | 에디터 콘텐츠 설정 (편집/로드 시 유용) |
| `focus()` | `() => void` | 포커스 |
| `blur()` | `() => void` | 포커스 해제 |
| `clear()` | `() => void` | 모든 콘텐츠 삭제 |
| `isEmpty` | `boolean` | 에디터가 비어있는지 여부 (마운트 후 사용 가능) |
| `charactersCount` | `number` | 현재 글자 수 |

## Getting Content

세 가지 형식으로 에디터 콘텐츠를 가져올 수 있습니다:

```tsx
const handleSave = () => {
  if (!editorRef.current) return;

  // 서버 저장 · 복원에 적합한 구조화된 JSON
  const json = editorRef.current.getJSON();

  // 미리보기 · 이메일 발송 등에 적합한 HTML
  const html = editorRef.current.getHTML();

  // 검색 인덱싱 · 글자 수 확인에 적합한 텍스트
  const text = editorRef.current.getText();
};
```

## Setting Content

`setContent`를 사용하여 편집할 콘텐츠를 로드합니다. JSON과 HTML 문자열 모두 지원합니다:

```tsx
// JSONContent로 설정
editorRef.current?.setContent({
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [{ type: 'text', text: 'Loaded content.' }],
    },
  ],
});

// HTML 문자열로 설정
editorRef.current?.setContent('<p>HTML에서 로드된 콘텐츠</p>');
```

## Reactive State: isEmpty & charactersCount

ref의 `isEmpty`와 `charactersCount`를 이용하여 에디터 상태를 실시간으로 추적할 수 있습니다.

### isEmpty 추적하기

`onEmptyChange` 콜백을 사용하면 에디터의 빈 상태 변화를 직접 받을 수 있습니다. 즉시 반응이 필요하면 `emptyCheckDebounceMs={0}`을 설정하세요 (기본값 200ms).

```tsx
const [isEmpty, setIsEmpty] = useState(true);

<WhiteEditor
  ref={editorRef}
  emptyCheckDebounceMs={0}
  onEmptyChange={setIsEmpty}
/>
```

### charactersCount 추적하기

`onUpdate` 콜백 내에서 `editorRef.current?.charactersCount`를 읽으면 ref가 아직 갱신되기 전이라 이전 값을 반환합니다. `setTimeout`으로 React 렌더 사이클 이후에 읽어야 최신 값을 정확히 가져올 수 있습니다.

```tsx
const [charCount, setCharCount] = useState(0);

<WhiteEditor
  ref={editorRef}
  onUpdate={() => {
    setTimeout(() => {
      setCharCount(editorRef.current?.charactersCount ?? 0);
    }, 0);
  }}
/>
```

> **왜 setTimeout이 필요한가?**
>
> ref의 `charactersCount`는 `useImperativeHandle`을 통해 노출되므로 React 렌더가 완료된 이후에 업데이트됩니다. `onUpdate`는 TipTap 트랜잭션 처리 중 동기적으로 실행되어, 이 시점에서는 ref가 아직 이전 렌더의 값을 유지하고 있습니다.

### 전체 예시

```tsx
import { useRef, useState } from 'react';
import { WhiteEditor, type WhiteEditorRef } from '@0ffen/white-editor';

function EditorWithStatus() {
  const editorRef = useRef<WhiteEditorRef>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [charCount, setCharCount] = useState(0);

  return (
    <>
      <div>
        isEmpty: {String(isEmpty)} · characters: {charCount}
      </div>
      <WhiteEditor
        ref={editorRef}
        emptyCheckDebounceMs={0}
        onEmptyChange={setIsEmpty}
        onUpdate={() => {
          setTimeout(() => {
            setCharCount(editorRef.current?.charactersCount ?? 0);
          }, 0);
        }}
      />
    </>
  );
}
```

## Focus & Clear

```tsx
// 에디터에 포커스
editorRef.current?.focus();

// 포커스 해제
editorRef.current?.blur();

// 콘텐츠 초기화
editorRef.current?.clear();
```

## Direct TipTap Editor Access

고급 작업을 위해 TipTap Editor 인스턴스에 직접 접근할 수 있습니다:

```tsx
// 텍스트 삽입
editorRef.current?.editor?.commands.insertContent('Hello World!');

// 선택 영역 확인
const { from, to } = editorRef.current?.editor?.state.selection ?? {};

// 커맨드 체이닝
editorRef.current?.editor?.chain().focus().toggleBold().run();
```
