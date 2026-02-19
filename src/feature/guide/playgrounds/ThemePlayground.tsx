import { useCallback, useRef, useState } from 'react';
import { useThemeContext } from '@/feature/theme';
import { useImageUpload } from '@/hooks';
import { cn } from '@/lib/utils';
import { WhiteEditor, WhiteEditorThemeProvider, type WhiteEditorRef } from '@0ffen/white-editor';
import { getDefaultColors, SECTION_LABELS, type SectionId } from '../constants';
import { ThemeColorsSection, ThemeModeSection, ThemeZIndexSection } from '../ui';

export default function ThemePlayground() {
  const editorRef = useRef<WhiteEditorRef>(null);
  const imageUpload = useImageUpload();
  const { theme: rootTheme } = useThemeContext();

  const [section, setSection] = useState<SectionId>('mode');
  const [mode, setMode] = useState<'light' | 'dark' | null>(null);
  const [colors, setColors] = useState<Record<string, string>>({});
  const [zIndex, setZIndex] = useState<Record<string, number>>({});

  const resolvedMode = mode ?? rootTheme;

  const updateColor = useCallback((key: string, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearColor = useCallback((key: string) => {
    setColors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const resetAllColors = useCallback(() => setColors({}), []);

  const updateZIndex = useCallback((key: string, value: number) => {
    setZIndex((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetAllZIndex = useCallback(() => setZIndex({}), []);

  const userColors = Object.fromEntries(Object.entries(colors).filter(([, v]) => v));
  const activeZIndex = Object.keys(zIndex).length > 0 ? zIndex : undefined;

  const colorCount = Object.keys(userColors).length;
  const zIndexCount = Object.keys(zIndex).length;

  /*
   * When resolvedMode differs from rootTheme, the root <html> CSS variables
   * (set via .dark class) cascade into the editor. We must explicitly pass
   * all default colors for the resolved mode so applyTheme sets inline CSS
   * variables on the provider wrapper, overriding the inherited root values.
   */
  const needsFullDefaults = resolvedMode !== rootTheme;
  const themeColors = needsFullDefaults
    ? { ...getDefaultColors(resolvedMode), ...userColors }
    : colorCount > 0
      ? userColors
      : undefined;

  return (
    <div className='flex flex-col gap-4'>
      {/* ─── Controls ─── */}
      <div className='border-border flex flex-col gap-5 rounded-xl border p-5'>
        {/* Section Switcher */}
        <div className='flex flex-col gap-2.5'>
          <span className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>Section</span>
          <div className='bg-muted inline-flex w-fit rounded-lg p-1'>
            {(['mode', 'colors', 'zIndex'] as const).map((s) => (
              <button
                type='button'
                key={s}
                onClick={() => setSection(s)}
                className={cn(
                  'rounded-md px-4 py-1.5 text-sm font-medium transition-all',
                  section === s
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {SECTION_LABELS[s]}
                {s === 'colors' && colorCount > 0 && (
                  <span className='text-primary ml-1.5 text-xs tabular-nums'>({colorCount})</span>
                )}
                {s === 'zIndex' && zIndexCount > 0 && (
                  <span className='text-primary ml-1.5 text-xs tabular-nums'>({zIndexCount})</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {section === 'mode' && <ThemeModeSection mode={resolvedMode} onModeChange={setMode} />}

        {section === 'colors' && (
          <ThemeColorsSection
            mode={resolvedMode}
            colors={colors}
            onUpdateColor={updateColor}
            onClearColor={clearColor}
            onResetAll={resetAllColors}
          />
        )}

        {section === 'zIndex' && (
          <ThemeZIndexSection
            zIndex={zIndex}
            setZIndex={setZIndex}
            updateZIndex={updateZIndex}
            onResetAll={resetAllZIndex}
          />
        )}
      </div>

      {/* ─── Themed Editor ─── */}
      <div className='border-border overflow-hidden rounded-lg border'>
        <WhiteEditorThemeProvider
          theme={{
            mode: resolvedMode,
            colors: themeColors,
            zIndex: activeZIndex,
          }}
        >
          <WhiteEditor
            ref={editorRef}
            extension={{ imageUpload }}
            placeholder='Check the theme changes in real time...'
            contentClassName='min-h-[250px]'
          />
        </WhiteEditorThemeProvider>
      </div>
    </div>
  );
}
