import { lazy, type LazyExoticComponent, type ComponentType } from 'react';

export interface GuidePageItem {
  slug: string;
  label: string;
  playground?: LazyExoticComponent<ComponentType>;
}

export interface GuideCategory {
  id: string;
  label: string;
  pages: GuidePageItem[];
}

export const guideConfig: GuideCategory[] = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    pages: [
      { slug: 'installation', label: 'Installation' },
      {
        slug: 'quick-start',
        label: 'Quick Start',
      },
    ],
  },
  {
    id: 'editor',
    label: 'Editor',
    pages: [
      {
        slug: 'usage-and-props',
        label: 'Usage & Props',
      },
      {
        slug: 'toolbar',
        label: 'Toolbar',
        playground: lazy(() => import('./playgrounds/ToolbarPlayground')),
      },
      {
        slug: 'ref-api',
        label: 'Ref API',
        playground: lazy(() => import('./playgrounds/RefApiPlayground')),
      },
      {
        slug: 'events-and-state',
        label: 'Events & State',
        playground: lazy(() => import('./playgrounds/EventsPlayground')),
      },
    ],
  },
  {
    id: 'viewer',
    label: 'Viewer',
    pages: [
      {
        slug: 'usage-and-options',
        label: 'Usage & Options',
        playground: lazy(() => import('./playgrounds/ViewerPlayground')),
      },
    ],
  },
  {
    id: 'theme',
    label: 'Theme',
    pages: [
      {
        slug: 'customization',
        label: 'Theme Customization',
        playground: lazy(() => import('./playgrounds/ThemePlayground')),
      },
    ],
  },
  {
    id: 'extensions',
    label: 'Extensions',
    pages: [
      { slug: 'mention', label: 'Mention' },
      { slug: 'page-mention', label: 'Page Mention' },
      { slug: 'image-upload', label: 'Image Upload' },
      { slug: 'character-count', label: 'Character Count' },
      { slug: 'custom-extensions', label: 'Custom Extensions' },
    ],
  },
  {
    id: 'utilities',
    label: 'Utilities',
    pages: [{ slug: 'overview', label: 'Utilities' }],
  },
  {
    id: 'examples',
    label: 'Examples',
    pages: [
      { slug: 'complete', label: 'Complete' },
      { slug: 'minimal', label: 'Minimal' },
    ],
  },
];

// Helper to find a page config
export function findPageConfig(categorySlug: string, pageSlug: string) {
  const category = guideConfig.find((c) => c.id === categorySlug);
  if (!category) return null;
  const page = category.pages.find((p) => p.slug === pageSlug);
  if (!page) return null;
  return { category, page };
}

// Helper to get the first page path
export function getFirstPagePath() {
  const first = guideConfig[0];
  if (!first || !first.pages[0]) return '/guide';
  return `/guide/${first.id}/${first.pages[0].slug}`;
}
