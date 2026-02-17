import { useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { WhiteEditor } from '@/ui';
import { WhiteViewer as BaseWhiteViewer, type JSONContent } from '@0ffen/white-editor';
import type { WhiteEditorRef } from '@0ffen/white-editor';
import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import type { NodeViewProps } from '@tiptap/react';

// ---------------------------------------------------------------------------
// Video Embed — Custom Node View (with resize)
// ---------------------------------------------------------------------------

const MIN_WIDTH = 200;

function VideoEmbedView({ node, selected, updateAttributes }: NodeViewProps) {
  const { src, width } = node.attrs;
  const containerRef = useRef<HTMLDivElement>(null);
  const [resizing, setResizing] = useState(false);

  const onResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const startWidth = containerRef.current?.offsetWidth ?? 0;

      const onMouseMove = (moveEvent: MouseEvent) => {
        const delta = moveEvent.clientX - startX;
        const newWidth = Math.max(MIN_WIDTH, startWidth + delta);
        updateAttributes({ width: `${newWidth}px` });
      };

      const onMouseUp = () => {
        setResizing(false);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      setResizing(true);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [updateAttributes]
  );

  if (!src) {
    return (
      <NodeViewWrapper>
        <div className='bg-muted text-muted-foreground flex items-center justify-center rounded-lg border border-dashed py-8 text-sm'>
          No video URL provided
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper>
      <div
        ref={containerRef}
        className={cn(
          'group relative overflow-hidden rounded-lg border-2 transition-colors',
          selected || resizing ? 'border-primary' : 'border-transparent'
        )}
        style={{ width: width ?? '100%', maxWidth: '100%' }}
      >
        {/* 16:9 aspect ratio container */}
        <div className='relative w-full' style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={src}
            className='absolute top-0 left-0 h-full w-full'
            style={{ border: 0, pointerEvents: resizing ? 'none' : 'auto' }}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>

        {/* Resize handle */}
        <div
          className={cn(
            'absolute top-0 right-0 z-10 flex h-full w-3 cursor-col-resize items-center justify-center opacity-0 transition-opacity',
            (selected || resizing) && 'opacity-100'
          )}
          onMouseDown={onResizeStart}
        >
          <div className='bg-primary h-8 w-1 rounded-full' />
        </div>
      </div>
    </NodeViewWrapper>
  );
}

// ---------------------------------------------------------------------------
// Video Embed — Custom Node Definition
// ---------------------------------------------------------------------------

const VideoEmbedNode = Node.create({
  name: 'videoEmbed',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      src: { default: null },
      width: { default: '100%' },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-video-embed]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-video-embed': '' }, HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(VideoEmbedView);
  },
});

// ---------------------------------------------------------------------------
// URL Helpers
// ---------------------------------------------------------------------------

function toEmbedUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';

  const ytMatch = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;

  const vimeoMatch = trimmed.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  return trimmed;
}

// ---------------------------------------------------------------------------
// Playground Component
// ---------------------------------------------------------------------------

type Mode = 'editor' | 'viewer';

export default function CustomExtensionPlayground() {
  const editorRef = useRef<WhiteEditorRef>(null);
  const [mode, setMode] = useState<Mode>('editor');
  const [url, setUrl] = useState('');
  const [viewerContent, setViewerContent] = useState<JSONContent | null>(null);

  const insertVideo = useCallback((videoUrl: string) => {
    const embedUrl = toEmbedUrl(videoUrl);
    if (!embedUrl) return;

    const editor = editorRef.current?.editor;
    if (!editor) return;

    editor
      .chain()
      .focus()
      .insertContent({ type: 'videoEmbed', attrs: { src: embedUrl } })
      .run();
  }, []);

  const handleInsert = () => {
    insertVideo(url);
  };

  const switchToViewer = () => {
    const json = editorRef.current?.getJSON();
    if (json) setViewerContent(json);
    setMode('viewer');
  };

  const switchToEditor = () => {
    setMode('editor');
  };

  return (
    <div className='flex flex-col gap-4'>
      {/* Controls */}
      <div className='border-border flex flex-col gap-5 rounded-xl border p-5'>
        {/* Mode Switcher */}
        <div className='flex flex-col gap-2.5'>
          <span className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>Mode</span>
          <div className='bg-muted inline-flex w-fit rounded-lg p-1'>
            {(['editor', 'viewer'] as const).map((m) => (
              <button
                type='button'
                key={m}
                onClick={m === 'editor' ? switchToEditor : switchToViewer}
                className={cn(
                  'rounded-md px-4 py-1.5 text-sm font-medium transition-all',
                  mode === m ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {m === 'editor' ? 'Editor' : 'Viewer'}
              </button>
            ))}
          </div>
        </div>

        {/* URL Input — Editor mode only */}
        {mode === 'editor' && (
          <>
            <div className='flex flex-col gap-2.5'>
              <span className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>Video URL</span>
              <div className='flex gap-2'>
                <input
                  type='text'
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleInsert();
                  }}
                  placeholder='YouTube or Vimeo URL...'
                  className='border-border bg-background focus:ring-primary/20 flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2'
                />
                <button
                  type='button'
                  onClick={handleInsert}
                  disabled={!url.trim()}
                  className={cn(
                    'rounded-lg px-4 py-2 text-sm font-medium transition-all',
                    url.trim()
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  )}
                >
                  Insert
                </button>
              </div>
            </div>
          </>
        )}

        {/* Viewer mode info */}
        {mode === 'viewer' && (
          <div className='flex flex-col gap-2.5'>
            <span className='text-muted-foreground text-xs'>
              에디터에서 작성한 콘텐츠를 WhiteViewer로 렌더링합니다. 커스텀 노드가 동일하게 표시됩니다.
            </span>
          </div>
        )}
      </div>

      {/* Editor / Viewer */}
      {mode === 'editor' ? (
        <div className='border-border rounded-lg border'>
          <WhiteEditor
            ref={editorRef}
            customNodes={[VideoEmbedNode]}
            placeholder='Insert a video using the controls above, or type text...'
            editorClassName='rounded-lg'
            contentClassName='min-h-[300px] rounded-lg'
          />
        </div>
      ) : (
        <div className='border-border rounded-lg border'>
          {viewerContent ? (
            <BaseWhiteViewer content={viewerContent} customNodes={[VideoEmbedNode]} className='min-h-[300px] p-4' />
          ) : (
            <div className='text-muted-foreground flex min-h-[300px] items-center justify-center text-sm'>
              에디터에서 콘텐츠를 작성한 후 Viewer 모드로 전환하세요.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
