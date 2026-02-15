import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, Copy, RotateCcw } from 'lucide-react';

import { MonacoEditor, WhiteViewer, Button } from '@/ui';

import { convertHtmlToJson, createEmptyContent, markdownToHtml } from '@0ffen/white-editor/util';

const INITIAL_MARKDOWN = ``;

const DEBOUNCE_MS = 200;

const COPIED_RESET_MS = 2000;

export function MarkdownPlayground() {
  const [liveMarkdown, setLiveMarkdown] = useState(INITIAL_MARKDOWN);
  const [debouncedMarkdown, setDebouncedMarkdown] = useState(INITIAL_MARKDOWN);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedMarkdown(liveMarkdown), DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [liveMarkdown]);

  const livePreviewContent = useMemo(() => {
    const html = markdownToHtml(debouncedMarkdown);
    return html ? convertHtmlToJson(html) : createEmptyContent();
  }, [debouncedMarkdown]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(debouncedMarkdown);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }, [debouncedMarkdown]);

  const handleReset = useCallback(() => {
    setLiveMarkdown(INITIAL_MARKDOWN);
    setDebouncedMarkdown(INITIAL_MARKDOWN);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), COPIED_RESET_MS);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <section className='relative mx-auto mt-10 flex min-h-screen max-w-7xl flex-col gap-6 px-4 pt-8'>
      <header className='grid grid-cols-[1fr_auto_1fr] items-center gap-4'>
        <div />
        <h1 className='text-xl font-bold'>Markdown Playground</h1>
        <div className='flex justify-end gap-2'>
          <Button variant='secondary' size='sm' onClick={handleCopy}>
            {copied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />}
            {copied ? 'Copied' : 'Copy'}
          </Button>
          <Button variant='secondary' size='sm' onClick={handleReset}>
            <RotateCcw className='h-4 w-4' />
            Reset
          </Button>
        </div>
      </header>

      <div className='grid grid-cols-2 gap-4'>
        <MonacoEditor
          value={liveMarkdown}
          onChange={setLiveMarkdown}
          height='800px'
          enableLint
          className='overflow-y-auto rounded-md'
        />
        <div className='flex flex-col gap-2'>
          <WhiteViewer
            className='max-h-[800px] flex-1 overflow-y-auto rounded-md border p-4'
            content={livePreviewContent}
          />
        </div>
      </div>
    </section>
  );
}
