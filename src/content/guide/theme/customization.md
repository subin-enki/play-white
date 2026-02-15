# Theme Customization

`WhiteEditorThemeProvider`로 에디터/뷰어를 감싸서 테마 모드, 색상, z-index 레이어를 제어할 수 있습니다.

## Basic Setup

```tsx
import { WhiteEditorThemeProvider, WhiteEditor } from '@0ffen/white-editor';

// 간단한 문자열
<WhiteEditorThemeProvider theme="dark">
  <WhiteEditor />
</WhiteEditorThemeProvider>

// 객체 설정
<WhiteEditorThemeProvider
  theme={{
    mode: 'dark',
    colors: { brandDefault: '#3b82f6' },
    zIndex: { toolbar: 10, floating: 20 },
  }}
>
  <WhiteEditor />
</WhiteEditorThemeProvider>
```

## ThemeProp

```ts
type ThemeProp = 'light' | 'dark' | {
  mode?: 'light' | 'dark';
  colors?: WhiteEditorThemeColors;
  zIndex?: WhiteEditorThemeZIndex;
};
```

## Colors (WhiteEditorThemeColors)

지정된 키만 CSS 변수로 적용됩니다. 지정하지 않은 키는 내장 기본값을 사용합니다.

값은 hex, rgb, hsl 또는 `var(--your-custom-variable)` 형식을 사용할 수 있습니다.

| Key | Description |
| --- | --- |
| `textNormal` | 본문 텍스트 |
| `textLight` | 보조 텍스트, 이미지 도형 비선택 색상 |
| `textSub` | 드롭다운/메뉴 보조 텍스트 |
| `textPlaceholder` | 에디터 플레이스홀더 |
| `elevationBackground` | 에디터/뷰어 배경 |
| `elevationLevel1` | 카드/블록 배경 |
| `elevationLevel2` | 코드 블록 배경 |
| `elevationDropdown` | 명령 목록/드롭다운 배경 |
| `borderDefault` | 테두리, 핸들, 구분선 |
| `interactionHover` | 호버 배경 |
| `brandWeak` | 선택/하이라이트 배경 |
| `brandLight` | 선택 테두리, 하이라이트, 버튼 |
| `brandDefault` | 링크, 강조, 인라인 코드 |

### Example with CSS Variables

```tsx
<WhiteEditorThemeProvider
  theme={{
    mode: 'dark',
    colors: {
      textNormal: 'var(--color-text-normal)',
      textPlaceholder: 'var(--color-text-placeholder)',
      elevationBackground: 'var(--color-elevation-background)',
      elevationDropdown: 'var(--color-elevation-dropdown)',
      brandDefault: 'var(--color-brand-default)',
      brandWeak: 'var(--color-brand-weak)',
    },
  }}
>
  <WhiteEditor />
</WhiteEditorThemeProvider>
```

## z-index (WhiteEditorThemeZIndex)

레이어 쌓임 순서를 제어합니다. 지정된 키만 적용됩니다.

| Key | Type | Description |
| --- | --- | --- |
| `toolbar` | `number` | 툴바 |
| `inline` | `number` | 멘션 목록, 고정 헤더 |
| `handle` | `number` | 표 열 크기 조절 핸들 |
| `overlay` | `number` | 다이얼로그 오버레이/백드롭 |
| `floating` | `number` | 드롭다운, 팝오버, 툴팁, 셀렉트, 컨텍스트 메뉴, 다이얼로그 콘텐츠 (**overlay보다 높아야 함**) |

```tsx
<WhiteEditorThemeProvider
  theme={{
    zIndex: {
      toolbar: 10,
      inline: 10,
      handle: 10,
      overlay: 10,
      floating: 20,
    },
  }}
>
```

## Fonts

CDN 폰트를 사용할 수 없는 경우(오프라인/로컬), 폰트를 `public/assets/fonts`에 복사하세요:

**수동:**
```bash
node node_modules/@0ffen/white-editor/scripts/copy-fonts-to-public.cjs
```

**자동 (postinstall):**
```json
{
  "scripts": {
    "copy:white-editor-fonts": "node node_modules/@0ffen/white-editor/scripts/copy-fonts-to-public.cjs"
  }
}
```
