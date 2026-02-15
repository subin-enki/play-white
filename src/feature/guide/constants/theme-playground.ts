/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ColorDef {
  key: string;
  label: string;
  defaultLight: string;
  defaultDark: string;
}

export interface ZIndexDef {
  key: string;
  label: string;
  description: string;
  defaultValue: number;
}

export type SectionId = 'mode' | 'colors' | 'zIndex';

/* ------------------------------------------------------------------ */
/*  Color definitions                                                  */
/* ------------------------------------------------------------------ */

export const COLOR_GROUPS: { label: string; items: ColorDef[] }[] = [
  {
    label: 'Text',
    items: [
      { key: 'textNormal', label: 'textNormal', defaultLight: '#161616', defaultDark: '#ececec' },
      { key: 'textLight', label: 'textLight', defaultLight: '#9f9f9f', defaultDark: '#888888' },
      { key: 'textSub', label: 'textSub', defaultLight: '#585858', defaultDark: '#d6d6d6' },
      { key: 'textPlaceholder', label: 'textPlaceholder', defaultLight: '#bbbbbb', defaultDark: '#5f5f5f' },
    ],
  },
  {
    label: 'Elevation',
    items: [
      { key: 'elevationBackground', label: 'elevationBackground', defaultLight: '#ffffff', defaultDark: '#161616' },
      { key: 'elevationLevel1', label: 'elevationLevel1', defaultLight: '#f8f8f8', defaultDark: '#1e1e1e' },
      { key: 'elevationLevel2', label: 'elevationLevel2', defaultLight: '#f1f1f1', defaultDark: '#252525' },
      { key: 'elevationDropdown', label: 'elevationDropdown', defaultLight: '#ffffff', defaultDark: '#252525' },
    ],
  },
  {
    label: 'Border & Interaction',
    items: [
      { key: 'borderDefault', label: 'borderDefault', defaultLight: '#e6e6e6', defaultDark: '#333333' },
      { key: 'interactionHover', label: 'interactionHover', defaultLight: '#1616160a', defaultDark: '#ffffff0a' },
    ],
  },
  {
    label: 'Brand',
    items: [
      { key: 'brandWeak', label: 'brandWeak', defaultLight: '#f0f6ff', defaultDark: '#172042' },
      { key: 'brandLight', label: 'brandLight', defaultLight: '#85abff', defaultDark: '#213677' },
      { key: 'brandDefault', label: 'brandDefault', defaultLight: '#3279ec', defaultDark: '#2c55d0' },
    ],
  },
];

export const ALL_COLOR_KEYS = COLOR_GROUPS.flatMap((g) => g.items.map((i) => i.key));

/** Returns all default color values for the given mode */
export function getDefaultColors(mode: 'light' | 'dark'): Record<string, string> {
  return Object.fromEntries(
    COLOR_GROUPS.flatMap((g) =>
      g.items.map((i) => [i.key, mode === 'dark' ? i.defaultDark : i.defaultLight])
    )
  );
}

/* ------------------------------------------------------------------ */
/*  z-index definitions                                                */
/* ------------------------------------------------------------------ */

export const ZINDEX_ITEMS: ZIndexDef[] = [
  { key: 'toolbar', label: 'toolbar', description: '툴바', defaultValue: 50 },
  { key: 'inline', label: 'inline', description: '멘션, 고정 헤더', defaultValue: 50 },
  { key: 'handle', label: 'handle', description: '표 열 크기 핸들', defaultValue: 50 },
  { key: 'overlay', label: 'overlay', description: '다이얼로그 오버레이', defaultValue: 50 },
  { key: 'floating', label: 'floating', description: '드롭다운, 팝오버 등', defaultValue: 51 },
];

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export const SECTION_LABELS: Record<SectionId, string> = {
  mode: 'Mode',
  colors: 'Colors',
  zIndex: 'z-index',
};
