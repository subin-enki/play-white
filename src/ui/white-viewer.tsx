import { cn } from '@/lib/utils';
import { WhiteViewer as BaseWhiteViewer, type JSONContent } from '@0ffen/white-editor';

export function WhiteViewer({ content, className }: { content: JSONContent | string; className?: string }) {
  return (
    <div className={cn('overflow-y-auto rounded-md', className)}>
      <BaseWhiteViewer content={content} />
    </div>
  );
}
