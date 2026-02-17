import { useRef } from 'react';
import { WhiteEditor } from '@/ui';
import type { WhiteEditorRef } from '@0ffen/white-editor';

const defaultContent = `
<h1>White Editor Playground 🍈</h1><hr><h1>Welcome to the White Editor Playground!</h1><p data-variant="1">Experience a <span style="color: var(--we-yellow-default);">modern rich-text editor</span> built with <span style="font-size: 0px; line-height: 0;">&nbsp;&nbsp;</span> <span style="font-size: 0px; line-height: 0;">&nbsp;</span>React<span style="font-size: 0px; line-height: 0;">&nbsp;</span>. <br>This playground showcases just a part of White Editor's capabilities. <span style="font-size: 0px; line-height: 0;">&nbsp;</span>Explore the documentation<span style="font-size: 0px; line-height: 0;">&nbsp;</span> to discover more.</p><h1>Rich Content Editing</h1><p data-variant="1">Structure your content with <span style="font-size: 0px; line-height: 0;">&nbsp;</span><span style="color: var(--we-red-default);"><mark data-color="var(--we-red-weak)" style="background-color: var(--we-red-weak); color: inherit;">headings</mark></span><span style="font-size: 0px; line-height: 0;">&nbsp;</span>, <span style="font-size: 0px; line-height: 0;">&nbsp;</span><span style="color: var(--we-green-default);"><mark data-color="var(--we-green-weak)" style="background-color: var(--we-green-weak); color: inherit;">lists</mark></span><span style="font-size: 0px; line-height: 0;">&nbsp;</span>, and <span style="font-size: 0px; line-height: 0;">&nbsp;</span><span style="color: var(--we-purple-default);"><mark data-color="var(--we-purple-weak)" style="background-color: var(--we-purple-weak); color: inherit;">quotes</mark></span><span style="color: var(--we-purple-default); font-size: 0px; line-height: 0;"><mark data-color="var(--we-purple-weak)" style="background-color: var(--we-purple-weak); color: inherit;">&nbsp;</mark></span><span style="color: var(--we-purple-default);"><mark data-color="var(--we-purple-weak)" style="background-color: var(--we-purple-weak); color: inherit;">. </mark></span><br>Apply <span style="font-size: 0px; line-height: 0;">&nbsp;</span>marks<span style="font-size: 0px; line-height: 0;">&nbsp;</span> like <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strikethrough</s>, and <span style="font-size: 0px; line-height: 0;">&nbsp;</span><code>code</code>. <br>Use <span style="font-size: 0px; line-height: 0;">&nbsp;</span>autoformatting<span style="font-size: 0px; line-height: 0;">&nbsp;</span> for <span style="font-size: 0px; line-height: 0;">&nbsp;</span>Markdown<span style="font-size: 0px; line-height: 0;">&nbsp;</span>-like shortcuts (e.g., <span style="font-size: 0px; line-height: 0;">&nbsp;</span>- for lists, <span style="font-size: 0px; line-height: 0;">&nbsp;</span># <span style="font-size: 0px; line-height: 0;">&nbsp;</span> for H1).</p><blockquote><p data-variant="1">Blockquotes are great for highlighting important information.</p></blockquote><pre><code class="language-javascript">function hello() {
console.info('Code blocks are supported!');}</code></pre><p data-variant="1">Create <span style="font-size: 0px; line-height: 0;">&nbsp;</span><a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/0ffen/white-editor">White Editor GitHub 저장소</a><a target="_blank" rel="noopener noreferrer nofollow" class="slate-a font-medium text-primary underline decoration-primary underline-offset-4" href="/docs/link"><span style="font-size: 0px; line-height: 0;">&nbsp;</span></a>, <br><span style="font-size: 0px; line-height: 0;">&nbsp;</span>@mention<span style="font-size: 0px; line-height: 0;">&nbsp;</span> users like <span data-type="mention" data-id="1" data-label="Ariana" data-mention-suggestion-char="@">@Ariana</span></p><h3>Image and Image Editor</h3><p data-variant="1">Embed images directly in your content. Supports <span style="font-size: 0px; line-height: 0;">&nbsp;</span>Media uploads<span style="font-size: 0px; line-height: 0;">&nbsp;</span> and <span style="font-size: 0px; line-height: 0;">&nbsp;</span>drag &amp; drop<span style="font-size: 0px; line-height: 0;">&nbsp;</span> for a smooth experience.</p><img src="${import.meta.env.BASE_URL}w-3d.png" alt="Image" width="311px" height="311px" data-caption="white-editor image caption"><p data-variant="1"></p>`;

export default function EditorPlayground() {
  const editorRef = useRef<WhiteEditorRef>(null);

  return (
    <div className='flex min-h-screen flex-col gap-6 pt-20'>
      <h1 className='text-center text-xl font-bold'>Editor Playground</h1>
      <div className='container mx-auto max-w-6xl px-4 py-2'>
        <WhiteEditor
          editable={false}
          editorClassName='!border !border-border !rounded-md !h-[calc(100vh-100px)] w-full'
          contentClassName='h-full w-full rounded-md'
          onCreate={() => {
            editorRef.current?.setContent(defaultContent);
          }}
          ref={editorRef}
          extension={{
            mention: {
              data: [
                { uuid: 1, name: 'Ariana Grande', nickname: 'Ariana' },
                { uuid: 2, name: 'Timothy', nickname: 'Timothy' },
              ],
              id: 'uuid',
              label: 'nickname',
            },
          }}
        />
      </div>
    </div>
  );
}
