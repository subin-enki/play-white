# Image Upload

에디터에 이미지를 업로드하고 삽입할 수 있습니다. 파일 선택 또는 드래그 앤 드롭으로 이미지를 추가합니다.

## Setup

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
      maxSize: 1024 * 1024 * 10,  // 10MB
      accept: 'image/*',
      limit: 1,
    },
  }}
/>
```

## ImageUploadConfig

이미지 업로드 익스텐션의 설정 옵션입니다.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `upload` | `(file: File) => Promise<string>` | — | 이미지 URL을 반환하는 업로드 함수 |
| `accept` | `string` | `'image/*'` | 허용 파일 타입 |
| `maxSize` | `number` | `50MB` | 최대 파일 크기 (바이트) |
| `limit` | `number` | `1` | 한 번에 업로드 가능한 최대 파일 수 |
| `onSuccess` | `(url: string) => void` | — | 업로드 성공 시 호출 |
| `onError` | `(error: Error) => void` | — | 업로드 실패 시 호출 |
| `onImageInserted` | `(url: string, caption?: string) => void` | — | 이미지가 에디터에 삽입된 후 호출 |

## Callbacks

업로드 성공/실패 시 콜백을 설정할 수 있습니다:

```tsx
extension={{
  imageUpload: {
    upload: handleImageUpload,
    onSuccess: (url) => {
      console.log('이미지 업로드 성공:', url);
    },
    onError: (error) => {
      console.error('이미지 업로드 실패:', error.message);
    },
    onImageInserted: (url, caption) => {
      console.log('이미지 삽입 완료:', url);
    },
  },
}}
```

## Toolbar Image Button

`toolbarProps.image`를 통해 이미지 툴바 버튼의 UI를 커스터마이징할 수 있습니다:

```tsx
<WhiteEditor
  extension={{
    imageUpload: {
      upload: handleImageUpload,
    },
  }}
  toolbarProps={{
    image: {
      icon: <MyCustomIcon />,
      className: 'custom-image-button',
    },
  }}
/>
```

### ImageToolbarButtonProps

이미지 툴바 버튼의 UI 설정 옵션입니다.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `React.ReactNode` | `<ImagePlusIcon />` | 커스텀 아이콘 |
| `className` | `string` | — | 추가 CSS 클래스 |
