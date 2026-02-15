import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { WhiteEditor } from '@/ui';
import type { WhiteEditorRef, ToolbarItem } from '@0ffen/white-editor';
import { WHITE_EDITOR_TOOLBAR_ITEMS, DEFAULT_TOOLBAR_ITEMS, MINIMAL_TOOLBAR_ITEMS } from '@0ffen/white-editor';

const PRESETS: Record<string, { label: string; description: string; items: ToolbarItem[][] }> = {
  full: {
    label: 'Full',
    description: 'All available toolbar items',
    items: WHITE_EDITOR_TOOLBAR_ITEMS,
  },
  default: {
    label: 'Default',
    description: 'Recommended set of items',
    items: DEFAULT_TOOLBAR_ITEMS,
  },
  minimal: {
    label: 'Minimal',
    description: 'Basic formatting only',
    items: MINIMAL_TOOLBAR_ITEMS,
  },
};

const ITEM_GROUPS: { label: string; items: ToolbarItem[] }[] = [
  { label: 'History', items: ['undo', 'redo'] },
  { label: 'Text', items: ['heading', 'bold', 'italic', 'underline', 'strike', 'code'] },
  { label: 'Color', items: ['color', 'highlight'] },
  { label: 'Insert', items: ['link', 'image', 'table'] },
  { label: 'Block', items: ['blockquote', 'codeblock', 'bulletList', 'orderedList', 'taskList'] },
  { label: 'Align', items: ['textAlignLeft', 'textAlignCenter', 'textAlignRight'] },
  { label: 'Math', items: ['inlineMath', 'blockMath'] },
];

export default function ToolbarPlayground() {
  const editorRef = useRef<WhiteEditorRef>(null);
  const [mode, setMode] = useState<'preset' | 'custom'>('preset');
  const [preset, setPreset] = useState<string>('default');
  const [customItems, setCustomItems] = useState<Set<ToolbarItem>>(
    new Set(['heading', 'bold', 'italic', 'link', 'image'])
  );

  const toggleItem = (item: ToolbarItem) => {
    setCustomItems((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  };

  const selectAllInGroup = (items: ToolbarItem[]) => {
    setCustomItems((prev) => {
      const next = new Set(prev);
      const allSelected = items.every((i) => next.has(i));
      items.forEach((i) => (allSelected ? next.delete(i) : next.add(i)));
      return next;
    });
  };

  const toolbarItems: ToolbarItem[][] =
    mode === 'preset' ? (PRESETS[preset]?.items ?? DEFAULT_TOOLBAR_ITEMS) : [Array.from(customItems)];

  return (
    <div className='flex flex-col gap-4'>
      {/* Controls */}
      <div className='border-border bg-muted/30 flex flex-col gap-5 rounded-xl border p-5'>
        {/* Mode Switcher */}
        <div className='flex flex-col gap-2.5'>
          <span className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>Mode</span>
          <div className='bg-muted inline-flex w-fit rounded-lg p-1'>
            {(['preset', 'custom'] as const).map((m) => (
              <button
                type='button'
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  'rounded-md px-4 py-1.5 text-sm font-medium transition-all',
                  mode === m ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {m === 'preset' ? 'Preset' : 'Custom'}
              </button>
            ))}
          </div>
        </div>

        {/* Preset Options */}
        {mode === 'preset' ? (
          <div className='flex flex-col gap-2.5'>
            <span className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>Template</span>
            <div className='grid grid-cols-3 gap-2'>
              {Object.entries(PRESETS).map(([key, { label, description }]) => (
                <button
                  type='button'
                  key={key}
                  onClick={() => setPreset(key)}
                  className={cn(
                    'flex flex-col items-start rounded-lg border px-3.5 py-2.5 text-left transition-all',
                    preset === key
                      ? 'border-primary bg-primary/5 ring-primary/20 ring-1'
                      : 'border-border hover:border-foreground/20 hover:bg-muted/50'
                  )}
                >
                  <span className={cn('text-sm font-medium', preset === key ? 'text-primary' : 'text-foreground')}>
                    {label}
                  </span>
                  <span className='text-muted-foreground mt-0.5 text-xs'>{description}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Custom Item Picker */
          <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>Toolbar Items</span>
              <span className='text-muted-foreground text-xs tabular-nums'>{customItems.size} selected</span>
            </div>
            <div className='flex flex-col gap-3'>
              {ITEM_GROUPS.map(({ label, items }) => {
                const allSelected = items.every((i) => customItems.has(i));
                return (
                  <div key={label} className='flex flex-col gap-1.5'>
                    <button
                      type='button'
                      onClick={() => selectAllInGroup(items)}
                      className={cn(
                        'w-fit text-xs font-medium transition-colors',
                        allSelected ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {label}
                    </button>
                    <div className='flex flex-wrap gap-1.5'>
                      {items.map((item) => {
                        const selected = customItems.has(item);
                        return (
                          <button
                            type='button'
                            key={item}
                            onClick={() => toggleItem(item)}
                            className={cn(
                              'rounded-md border px-2.5 py-1 text-xs font-medium transition-all',
                              selected
                                ? 'border-primary/30 bg-primary/10 text-primary'
                                : 'border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground'
                            )}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Editor */}
      <div className='border-border rounded-lg border'>
        <WhiteEditor
          ref={editorRef}
          toolbarItems={toolbarItems}
          placeholder='Try different toolbar configurations...'
          editorClassName='rounded-lg'
          contentClassName='min-h-[250px] rounded-lg'
        />
      </div>
    </div>
  );
}
