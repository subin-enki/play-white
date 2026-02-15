import { RotateCcw } from 'lucide-react';
import { ZINDEX_ITEMS } from '../constants';
import { ZIndexRow } from './ZIndexRow';

interface ThemeZIndexSectionProps {
  zIndex: Record<string, number>;
  setZIndex: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  updateZIndex: (key: string, value: number) => void;
  onResetAll: () => void;
}

export function ThemeZIndexSection({ zIndex, setZIndex, updateZIndex, onResetAll }: ThemeZIndexSectionProps) {
  const zIndexCount = Object.keys(zIndex).length;

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <span className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>
          White Editor Theme ZIndex
        </span>
        {zIndexCount > 0 && (
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

      <div className='flex flex-col gap-2'>
        {ZINDEX_ITEMS.map((def) => (
          <ZIndexRow key={def.key} def={def} zIndex={zIndex} setZIndex={setZIndex} updateZIndex={updateZIndex} />
        ))}
      </div>

      <span className='text-muted-foreground text-xs'>
        {zIndexCount > 0
          ? `${zIndexCount} / ${ZINDEX_ITEMS.length} 레이어가 커스텀 적용 중입니다.`
          : '값을 입력하면 해당 키만 z-index로 오버라이드됩니다. floating은 overlay보다 높아야 합니다.'}
      </span>
    </div>
  );
}
