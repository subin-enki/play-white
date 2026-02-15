import { forwardRef } from 'react';
import { useThemeContext } from '@/feature/theme';
import { ErrorBoundary } from '@/ui';
import {
  WhiteEditor as BaseWhiteEditor,
  WhiteEditorThemeProvider,
  type WhiteEditorRef,
  type WhiteEditorProps,
} from '@0ffen/white-editor';

export const WhiteEditor = forwardRef<WhiteEditorRef, WhiteEditorProps<unknown>>((props, ref) => {
  const { theme } = useThemeContext();
  return (
    <ErrorBoundary>
      <WhiteEditorThemeProvider
        theme={{
          mode: theme,
        }}
      >
        <BaseWhiteEditor ref={ref} {...props} />
      </WhiteEditorThemeProvider>
    </ErrorBoundary>
  );
});

WhiteEditor.displayName = 'WhiteEditor';
