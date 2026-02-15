import { useCallback, useEffect, useRef } from 'react';
import { MarkerSeverity } from 'monaco-editor';
import Editor, { type OnMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';

function indexToLineColumn(text: string, index: number): { line: number; column: number } {
  const before = text.slice(0, index);
  const lines = before.split('\n');
  const line = lines.length;
  const column = lines[lines.length - 1]?.length ?? 0;
  return { line, column };
}

function runMarkdownLint(
  text: string
): Array<{ line: number; column: number; endLine: number; endColumn: number; message: string }> {
  const markers: Array<{ line: number; column: number; endLine: number; endColumn: number; message: string }> = [];

  // Empty links: [](url) or [text]( )
  const emptyLinkRegex = /\[\s*\]\s*\([^)]*\)|\[[^\]]*\]\s*\(\s*\)/g;
  let match: RegExpExecArray | null;
  while ((match = emptyLinkRegex.exec(text)) !== null) {
    const start = indexToLineColumn(text, match.index);
    const end = indexToLineColumn(text, match.index + match[0].length);
    markers.push({
      ...start,
      endLine: end.line,
      endColumn: end.column,
      message: '빈 링크 (empty link or empty URL)',
    });
  }

  // Unclosed code blocks: odd number of ```
  const codeBlockRegex = /```/g;
  const codeBlockMatches: number[] = [];
  while ((match = codeBlockRegex.exec(text)) !== null) {
    codeBlockMatches.push(match.index);
  }
  if (codeBlockMatches.length % 2 === 1) {
    const lastIndex = codeBlockMatches[codeBlockMatches.length - 1];
    const start = indexToLineColumn(text, lastIndex);
    const end = indexToLineColumn(text, lastIndex + 3);
    markers.push({
      ...start,
      endLine: end.line,
      endColumn: end.column,
      message: '닫히지 않은 코드블록 (unclosed code block)',
    });
  }

  return markers;
}

export interface MarkdownMonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: string;
  className?: string;
  enableLint?: boolean;
}

export function MonacoEditor({
  value,
  onChange,
  height = '1000px',
  className,
  enableLint = false,
}: MarkdownMonacoEditorProps) {
  const monacoRef = useRef<typeof import('monaco-editor') | null>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const updateMarkers = useCallback(() => {
    if (!enableLint || !monacoRef.current || !editorRef.current) return;
    const model = editorRef.current.getModel();
    if (!model) return;
    const text = model.getValue();
    const markers = runMarkdownLint(text).map((m) => ({
      severity: MarkerSeverity.Warning,
      message: m.message,
      startLineNumber: m.line,
      startColumn: m.column,
      endLineNumber: m.endLine,
      endColumn: m.endColumn,
    }));
    monacoRef.current.editor.setModelMarkers(model, 'markdown-lint', markers);
  }, [enableLint]);

  const handleMount: OnMount = useCallback(
    (editor, monaco) => {
      editorRef.current = editor;
      monacoRef.current = monaco;
      if (enableLint) {
        updateMarkers();
        editor.onDidChangeModelContent(updateMarkers);
      }
    },
    [enableLint, updateMarkers]
  );

  useEffect(() => {
    if (enableLint && editorRef.current) updateMarkers();
  }, [value, enableLint, updateMarkers]);

  return (
    <Editor
      height={height}
      language='markdown'
      value={value}
      onChange={(v) => onChange(v ?? '')}
      onMount={handleMount}
      className={className}
      theme='vs-dark'
      options={{
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        padding: { top: 12 },
      }}
    />
  );
}
