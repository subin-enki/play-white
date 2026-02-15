# Image Upload

`extension.imageUpload` 옵션 및/또는 `toolbarProps.image`를 통해 이미지 업로드를 설정합니다.

## Extension Config

```tsx
const handleImageUpload = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await fetch('/api/upload', { method: 'POST', body: formData });
  const data = await response.json();
  return data.url;
};

<WhiteEditor
  extension={{
    imageUpload: {
      upload: handleImageUpload,
      onSuccess: (url) => console.log('Uploaded:', url),
      onError: (error) => console.error('Failed:', error),
    },
  }}
/>
```

## ImageUpload Config

이미지 업로드 익스텐션의 설정 옵션입니다.

| Property | Type | Description |
| --- | --- | --- |
| `upload` | `(file: File) => Promise<string>` | 이미지 URL을 반환하는 업로드 함수 |
| `onSuccess` | `(url: string) => void` | 업로드 성공 시 호출 |
| `onError` | `(error: Error) => void` | 업로드 실패 시 호출 |

## Toolbar Image Button

익스텐션과 독립적으로 또는 함께 이미지 툴바 버튼을 커스터마이징할 수 있습니다:

```tsx
<WhiteEditor
  extension={{
    imageUpload: {
      upload: handleImageUpload,
    },
  }}
  toolbarProps={{
    image: {
      maxSize: 1024 * 1024 * 10,  // 10MB
      accept: 'image/*',
      closeOnError: true,          // 에러 시 모달 닫기 (기본값: true)
    },
  }}
/>
```

## ImageDialogProps

이미지 업로드 다이얼로그의 설정 옵션입니다.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `maxSize` | `number` | `5MB` | 최대 파일 크기 (바이트) |
| `accept` | `string` | — | 허용 파일 타입 |
| `upload` | `(file: File) => Promise<string>` | — | 업로드 함수 |
| `onSuccess` | `(url: string) => void` | — | 성공 콜백 |
| `onError` | `(error: Error) => void` | — | 에러 콜백 |
| `closeOnError` | `boolean` | `true` | 에러 시 모달 닫기 |
