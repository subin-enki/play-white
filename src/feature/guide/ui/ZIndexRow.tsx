import { useCallback } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useHoldRepeat } from '@/hooks';
import { cn } from '@/lib/utils';
import { Input } from '@/ui';
import type { ZIndexDef } from '../constants';

interface ZIndexRowProps {
  def: ZIndexDef;
  zIndex: Record<string, number>;
  setZIndex: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  updateZIndex: (key: string, value: number) => void;
}

export function ZIndexRow({ def, zIndex, setZIndex, updateZIndex }: ZIndexRowProps) {
  const value = zIndex[def.key];
  const isSet = value !== undefined;

  const decrement = useCallback(() => {
    setZIndex((prev) => {
      const cur = prev[def.key] ?? def.defaultValue;
      const next = Math.max(0, cur - 1);
      if (next === def.defaultValue) {
        const n = { ...prev };
        delete n[def.key];
        return n;
      }
      return { ...prev, [def.key]: next };
    });
  }, [def.key, def.defaultValue, setZIndex]);

  const increment = useCallback(() => {
    setZIndex((prev) => {
      const cur = prev[def.key] ?? def.defaultValue;
      const next = Math.min(9999, cur + 1);
      return { ...prev, [def.key]: next };
    });
  }, [def.key, def.defaultValue, setZIndex]);

  const holdDec = useHoldRepeat(decrement);
  const holdInc = useHoldRepeat(increment);

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-all',
        isSet ? 'border-primary/20 bg-primary/5' : 'border-border hover:border-foreground/10'
      )}
    >
      <div className='flex min-w-0 flex-1 flex-col'>
        <code className='text-foreground text-xs font-medium'>{def.label}</code>
        <span className='text-muted-foreground text-[10px]'>{def.description}</span>
      </div>
      <div
        className={cn(
          'bg-background flex shrink-0 items-center rounded-lg border transition-all',
          'focus-within:border-primary/50 focus-within:ring-primary/20 focus-within:ring-1',
          isSet ? 'border-primary/30' : 'border-border'
        )}
      >
        <button
          type='button'
          onClick={decrement}
          {...holdDec}
          className='text-muted-foreground hover:text-foreground hover:bg-muted flex h-7 w-6 items-center justify-center rounded-l-[7px] transition-colors'
        >
          <ChevronDown size={14} />
        </button>
        <Input
          type='text'
          inputMode='numeric'
          placeholder={String(def.defaultValue)}
          value={isSet ? value : ''}
          onChange={(e) => {
            const v = e.target.value.replace(/[^0-9]/g, '');
            if (v === '') {
              setZIndex((prev) => {
                const next = { ...prev };
                delete next[def.key];
                return next;
              });
            } else {
              const num = Math.min(9999, Number(v));
              updateZIndex(def.key, num);
            }
          }}
          className='h-7 w-10 border-none bg-transparent px-0 text-center text-xs tabular-nums shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
        />
        <button
          type='button'
          onClick={increment}
          {...holdInc}
          className='text-muted-foreground hover:text-foreground hover:bg-muted flex h-7 w-6 items-center justify-center rounded-r-[7px] transition-colors'
        >
          <ChevronUp size={14} />
        </button>
      </div>
    </div>
  );
}
