# Utilities

`@0ffen/white-editor/util`에서 유틸리티 함수를 임포트합니다.

```tsx
import {
  getHtmlContent,
  convertHtmlToJson,
  getGeneratedText,
  createEmptyContent,
  checkEditorEmpty,
  markdownToHtml,
  normalizeContentSchema,
  normalizeContent,
} from '@0ffen/white-editor/util';
```

---

## getHtmlContent

JSONContent를 HTML 문자열로 변환합니다.

```ts
getHtmlContent(content: JSONContent): string
```

```tsx
const json = editorRef.current.getJSON();
const html = getHtmlContent(json);
// '<h1>Title</h1><p>Body</p>'
```

---

## convertHtmlToJson

HTML 문자열을 JSONContent로 변환합니다.

```ts
convertHtmlToJson(htmlContent: string): Record<string, any>
```

```tsx
const json = convertHtmlToJson('<h1>Title</h1><p>Body</p>');
// { type: 'doc', content: [{ type: 'heading', ... }, { type: 'paragraph', ... }] }
```

---

## getGeneratedText

JSONContent에서 일반 텍스트를 추출합니다.

```ts
getGeneratedText(content: JSONContent): string
```

```tsx
const text = getGeneratedText(jsonContent);
// 'Hello World'
```

---

## createEmptyContent

최소한의 빈 문서 구조를 생성합니다.

```ts
createEmptyContent(): { type: string; content: never[] }
```

```tsx
const empty = createEmptyContent();
// { type: 'doc', content: [] }
```

---

## checkEditorEmpty

에디터 필드(저장된 데이터)가 비어있는지 확인합니다. 텍스트 없이 이미지와 코드 블록만 있는 경우도 비어있지 않은 것으로 감지합니다.

```ts
checkEditorEmpty(editorField: { content?: JSONContent; html?: string } | null | undefined): boolean
```

```tsx
if (checkEditorEmpty(formData.body)) {
  setError('내용을 입력해주세요.');
}
```

---

## markdownToHtml

Markdown 문자열을 HTML로 변환합니다.

```ts
markdownToHtml(markdown: string): string
```

```tsx
const html = markdownToHtml('# Hello\n\nWorld');
// '<h1>Hello</h1>\n<p>World</p>\n'
```

---

## normalizeContentSchema

다양한 래퍼 형식에서 JSONContent를 추출하고 정규화합니다.

```ts
normalizeContentSchema(content: unknown): JSONContent
```

지원하는 형식:
- `{ content: JSONContent, html?: string }` 래퍼
- 원시 JSONContent
- 유효하지 않은 입력의 경우 빈 문서 반환

---

## normalizeContent

TipTap 렌더링에 적합하도록 JSONContent를 정규화합니다.

```ts
normalizeContent(content: JSONContent | null | undefined): JSONContent
```

- 숫자 `text` 필드를 문자열로 변환
- 빈 텍스트 노드를 제거
- 모든 자식 노드를 재귀적으로 정규화
