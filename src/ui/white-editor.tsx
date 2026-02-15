import { forwardRef } from 'react';
import { useTheme } from '@/hooks';
import { ErrorBoundary } from '@/ui';
import {
  WhiteEditor as BaseWhiteEditor,
  WhiteEditorThemeProvider,
  type WhiteEditorRef,
  type WhiteEditorProps,
} from '@0ffen/white-editor';

const CustomTheme = {
  colors: {
    brandDefault: 'var(--color-primary)',
    brandLight: 'var(--color-primary-light)',
    brandWeak: 'var(--color-primary-weak)',
  },
};

export const WhiteEditor = forwardRef<WhiteEditorRef, WhiteEditorProps<unknown>>((props, ref) => {
  const { theme } = useTheme();
  return (
    <ErrorBoundary>
      <WhiteEditorThemeProvider
        theme={{
          mode: theme,
          ...CustomTheme,
        }}
      >
        <BaseWhiteEditor ref={ref} {...props} />
      </WhiteEditorThemeProvider>
    </ErrorBoundary>
  );
});

WhiteEditor.displayName = 'WhiteEditor';
