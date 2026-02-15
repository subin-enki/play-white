import { RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ALL_COLOR_KEYS, COLOR_GROUPS, type ColorDef } from '../constants';

interface ThemeColorsSectionProps {
  mode: 'light' | 'dark';
  colors: Record<string, string>;
  onUpdateColor: (key: string, value: string) => void;
  onClearColor: (key: string) => void;
  onResetAll: () => void;
}

function ColorRow({
  def,
  value,
  fallback,
  onUpdate,
  onClear,
}: {
  def: ColorDef;
  value: string | undefined;
  fallback: string;
  onUpdate: (value: string) => void;
  onClear: () => void;
}) {
  const isSet = !!value;

  return (
    <div
      className={cn(
        'flex items-center gap-2.5 rounded-lg border px-3 py-2 transition-all',
        isSet ? 'border-primary/20 bg-primary/5' : 'border-border hover:border-foreground/10'
      )}
    >
      <label className='group/swatch relative h-7 w-7 shrink-0 cursor-pointer'>
        <span
          className='absolute inset-0 rounded-full shadow-sm ring-1 ring-black/10 transition-all group-hover/swatch:scale-110 group-hover/swatch:ring-2 group-hover/swatch:ring-black/20 dark:ring-white/15 dark:group-hover/swatch:ring-white/30'
          style={{ backgroundColor: value || fallback }}
        />
        <input
          type='color'
          value={value || fallback}
          onChange={(e) => onUpdate(e.target.value)}
          className='absolute inset-0 cursor-pointer opacity-0'
        />
      </label>
      <div className='flex min-w-0 flex-1 flex-col'>
        <code className='text-foreground truncate text-xs font-medium'>{def.label}</code>
        <span className='text-muted-foreground truncate text-[10px]'>
          {isSet ? value : `default: ${fallback}`}
        </span>
      </div>
      {isSet && (
        <button
          type='button'
          onClick={onClear}
          className='text-muted-foreground hover:text-foreground shrink-0 text-xs transition-colors'
          title='Reset'
        >
          <RotateCcw size={12} />
        </button>
      )}
    </div>
  );
}

export function ThemeColorsSection({ mode, colors, onUpdateColor, onClearColor, onResetAll }: ThemeColorsSectionProps) {
  const colorCount = Object.keys(colors).filter((k) => colors[k]).length;

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <span className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>
          White Editor Theme Colors
        </span>
        {colorCount > 0 && (
          <button
            type='button'
            onClick={onResetAll}
            className='text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs transition-colors'
          >
            <RotateCcw size={12} />
            Reset all
          </button>
        )}
      </div>

      <div className='flex flex-col gap-4'>
        {COLOR_GROUPS.map(({ label, items }) => (
          <div key={label} className='flex flex-col gap-2'>
            <span className='text-muted-foreground text-xs font-medium'>{label}</span>
            <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
              {items.map((def) => (
                <ColorRow
                  key={def.key}
                  def={def}
                  value={colors[def.key]}
                  fallback={mode === 'dark' ? def.defaultDark : def.defaultLight}
                  onUpdate={(v) => onUpdateColor(def.key, v)}
                  onClear={() => onClearColor(def.key)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <span className='text-muted-foreground text-xs'>
        {colorCount > 0
          ? `${colorCount} / ${ALL_COLOR_KEYS.length} 색상이 커스텀 적용 중입니다.`
          : '색상을 선택하면 해당 키만 CSS 변수로 오버라이드됩니다.'}
      </span>
    </div>
  );
}
