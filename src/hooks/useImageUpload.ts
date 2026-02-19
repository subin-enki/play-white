import { useCallback, useMemo } from 'react';
import type { EditorExtensions } from '@0ffen/white-editor';

const fakeUpload = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      setTimeout(() => {
        resolve(reader.result as string);
      }, 800);
    };
    reader.readAsDataURL(file);
  });
};

export function useImageUpload(): EditorExtensions['imageUpload'] {
  const upload = useCallback(async (file: File): Promise<string> => {
    return fakeUpload(file);
  }, []);

  return useMemo(
    () => ({
      upload,
      accept: 'image/*',
      limit: 1,
      maxSize: 1024 * 1024 * 10,
    }),
    [upload]
  );
}
