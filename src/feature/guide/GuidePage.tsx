import { Suspense, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks';
import { WhiteViewer as BaseWhiteViewer } from '@0ffen/white-editor';
import { convertHtmlToJson, createEmptyContent, markdownToHtml } from '@0ffen/white-editor/util';
import { findPageConfig, getFirstPagePath } from './guideConfig';

// Load all .md files under content/guide at build time as raw strings
const mdModules = import.meta.glob('/src/content/guide/**/*.md', {
  query: '?raw',
  eager: true,
}) as Record<string, { default: string }>;

function getMarkdown(categorySlug: string, pageSlug: string): string {
  const key = `/src/content/guide/${categorySlug}/${pageSlug}.md`;
  const mod = mdModules[key];
  if (!mod) return '';
  // Vite may return raw string directly or wrapped in { default: string }
  if (typeof mod === 'string') return mod;
  if (typeof mod.default === 'string') return mod.default;
  return '';
}

export function GuidePage() {
  const { categorySlug, pageSlug } = useParams();
  const isMobile = useIsMobile();

  const config = categorySlug && pageSlug ? findPageConfig(categorySlug, pageSlug) : null;

  const jsonContent = useMemo(() => {
    if (!categorySlug || !pageSlug) return createEmptyContent();
    const raw = getMarkdown(categorySlug, pageSlug);
    if (!raw) return createEmptyContent();

    const html = markdownToHtml(raw);
    return html ? convertHtmlToJson(html) : createEmptyContent();
  }, [categorySlug, pageSlug]);

  // Redirect /guide or invalid paths to first page
  if (!categorySlug || !pageSlug || !config) {
    return <Navigate to={getFirstPagePath()} replace />;
  }

  const { page } = config;
  const PlaygroundComponent = page.playground;

  return (
    <article className='mx-auto flex max-w-5xl flex-col gap-8'>
      <div className='min-h-[200px]'>
        <BaseWhiteViewer
          content={jsonContent}
          tableOfContents={{ position: isMobile ? 'top' : 'right', maxLevel: 3 }}
        />
      </div>

      {PlaygroundComponent && (
        <>
          <hr className='border-border' />
          <section className='flex flex-col gap-4'>
            <h2 className='text-xl font-semibold'>Try it</h2>
            {page.playgroundDescription && (
              <p className='text-muted-foreground text-sm whitespace-pre-wrap'>{page.playgroundDescription}</p>
            )}
            <Suspense
              fallback={
                <div className='text-muted-foreground flex items-center justify-center py-12 text-sm'>
                  Loading playground...
                </div>
              }
            >
              <PlaygroundComponent />
            </Suspense>
          </section>
        </>
      )}
    </article>
  );
}
