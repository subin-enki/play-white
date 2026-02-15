import { cn } from '@/lib/utils';

interface ThemeModeSectionProps {
  mode: 'light' | 'dark';
  onModeChange: (mode: 'light' | 'dark') => void;
}

export function ThemeModeSection({ mode, onModeChange }: ThemeModeSectionProps) {
  return (
    <div className='flex flex-col gap-2.5'>
      <span className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>Theme Mode</span>
      <div className='flex flex-wrap gap-1.5'>
        {(['light', 'dark'] as const).map((m) => (
          <button
            type='button'
            key={m}
            onClick={() => onModeChange(m)}
            className={cn(
              'rounded-md border px-3 py-1.5 text-sm font-medium transition-all',
              mode === m
                ? 'border-primary/30 bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground'
            )}
          >
            {m === 'light' ? 'Light' : 'Dark'}
          </button>
        ))}
      </div>
      <span className='text-muted-foreground text-xs'>
        에디터의 기본 색상 테마를 전환합니다. Colors에서 개별 색상을 오버라이드할 수 있습니다.
      </span>
    </div>
  );
}
