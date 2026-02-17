import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { WhiteViewer as BaseWhiteViewer, type JSONContent } from '@0ffen/white-editor';

interface HeadingItem {
  level: number;
  text: string;
  index: number;
}

type TocMode = 'builtin' | 'external' | 'off';

const sampleContent: JSONContent = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [{ type: 'text', text: 'White Editor Viewer Demo' }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'JSONContent를 읽기 전용으로 렌더링하는 뷰어입니다. 아래에서 목차 옵션을 토글해보세요.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Getting Started' }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: '패키지를 설치하고 WhiteViewer를 임포트하여 리치 텍스트 콘텐츠를 읽기 전용 모드로 표시합니다.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Configuration' }],
    },
    {
      type: 'paragraph',
      content: [{ type: 'text', text: 'tableOfContents prop을 전달하여 긴 문서의 네비게이션 사이드바를 표시합니다.' }],
    },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [{ type: 'text', text: 'Position Options' }],
    },
    {
      type: 'paragraph',
      content: [{ type: 'text', text: '목차의 위치를 top, left, right 중에서 선택할 수 있습니다.' }],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Advanced Usage' }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'onHeadingsReady를 사용하여 뷰어 외부에 완전히 커스텀한 목차를 구성할 수 있습니다.',
        },
      ],
    },
  ],
};

const MODE_LABELS: Record<TocMode, string> = {
  builtin: 'Built-in',
  external: 'External',
  off: 'Off',
};

export default function ViewerPlayground() {
  const [mode, setMode] = useState<TocMode>('builtin');
  const [position, setPosition] = useState<'top' | 'left' | 'right'>('right');
  const [maxLevel, setMaxLevel] = useState(3);

  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [scrollTo, setScrollTo] = useState<((index: number) => void) | null>(null);

  const handleHeadingsReady = useCallback((h: HeadingItem[], scrollToIndex: (index: number) => void) => {
    setHeadings(h);
    setScrollTo(() => scrollToIndex);
  }, []);

  return (
    <div className='flex flex-col gap-4'>
      {/* Controls */}
      <div className='border-border flex flex-col gap-5 rounded-xl border p-5'>
        {/* Mode Switcher */}
        <div className='flex flex-col gap-2.5'>
          <span className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>Mode</span>
          <div className='bg-muted inline-flex w-fit rounded-lg p-1'>
            {(['builtin', 'external', 'off'] as const).map((m) => (
              <button
                type='button'
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  'rounded-md px-4 py-1.5 text-sm font-medium transition-all',
                  mode === m ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {MODE_LABELS[m]}
              </button>
            ))}
          </div>
        </div>

        {/* Built-in Config */}
        {mode === 'builtin' && (
          <div className='flex flex-col gap-3'>
            <span className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>
              tableOfContents Config
            </span>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-1.5'>
                <span className='text-muted-foreground text-xs font-medium'>position</span>
                <div className='flex flex-wrap gap-1.5'>
                  {(['top', 'left', 'right'] as const).map((pos) => (
                    <button
                      key={pos}
                      type='button'
                      onClick={() => setPosition(pos)}
                      className={cn(
                        'rounded-md border px-2.5 py-1 text-xs font-medium transition-all',
                        position === pos
                          ? 'border-primary/30 bg-primary/10 text-primary'
                          : 'border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground'
                      )}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>
              <div className='flex flex-col gap-1.5'>
                <span className='text-muted-foreground text-xs font-medium'>maxLevel</span>
                <div className='flex flex-wrap gap-1.5'>
                  {[1, 2, 3, 4, 5, 6].map((level) => (
                    <button
                      key={level}
                      type='button'
                      onClick={() => setMaxLevel(level)}
                      className={cn(
                        'rounded-md border px-2.5 py-1 text-xs font-medium transition-all',
                        maxLevel === level
                          ? 'border-primary/30 bg-primary/10 text-primary'
                          : 'border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground'
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* External Info */}
        {mode === 'external' && (
          <div className='flex flex-col gap-2.5'>
            <span className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>onHeadingsReady</span>
            <span className='text-muted-foreground text-xs'>
              뷰어 외부에 커스텀 목차가 렌더링됩니다. 항목을 클릭하면 해당 제목으로 스크롤합니다.
            </span>
          </div>
        )}
      </div>

      {/* Viewer */}
      <div className='flex gap-4'>
        {/* External TOC — left side */}
        {mode === 'external' && headings.length > 0 && (
          <nav className='border-border flex w-48 shrink-0 flex-col gap-1 rounded-xl border p-4'>
            <span className='text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase'>Headings</span>
            {headings.map((h) => (
              <button
                key={h.index}
                type='button'
                onClick={() => scrollTo?.(h.index)}
                className='text-muted-foreground hover:text-foreground hover:bg-muted truncate rounded-md px-2 py-1 text-left text-xs transition-colors'
                style={{ paddingLeft: `${(h.level - 1) * 12 + 8}px` }}
              >
                {h.text}
              </button>
            ))}
          </nav>
        )}

        <div className='border-border min-w-0 flex-1 rounded-lg border'>
          {mode === 'builtin' ? (
            <BaseWhiteViewer content={sampleContent} className='p-4' tableOfContents={{ position, maxLevel }} />
          ) : mode === 'external' ? (
            <BaseWhiteViewer content={sampleContent} className='p-4' onHeadingsReady={handleHeadingsReady} />
          ) : (
            <BaseWhiteViewer content={sampleContent} className='p-4' />
          )}
        </div>
      </div>
    </div>
  );
}
