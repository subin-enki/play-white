import { lazy, type LazyExoticComponent, type ComponentType } from 'react';

export interface GuidePageItem {
  slug: string;
  label: string;
  playground?: LazyExoticComponent<ComponentType>;
  playgroundDescription?: string;
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
        playground: lazy(() => import('./playgrounds/QuickStartPlayground')),
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
      { slug: 'mention', label: 'Mention', playground: lazy(() => import('./playgrounds/MentionPlayground')) },
      {
        slug: 'page-mention',
        label: 'Page Mention',
        playground: lazy(() => import('./playgrounds/PageMentionPlayground')),
      },
      {
        slug: 'image-upload',
        label: 'Image Upload',
        playground: lazy(() => import('./playgrounds/ImageUploadPlayground')),
      },
      { slug: 'character-count', label: 'Character Count' },
      {
        slug: 'custom-extensions',
        label: 'Custom Extensions',
        playground: lazy(() => import('./playgrounds/CustomExtensionPlayground')),
        playgroundDescription:
          '위 가이드에서 설명한 Video Embed 커스텀 노드를 실제로 등록한 에디터입니다.\n YouTube/Vimeo URL을 입력하여 비디오를 삽입하고, Viewer 모드에서 동일하게 렌더링되는지 확인해보세요.',
      },
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
