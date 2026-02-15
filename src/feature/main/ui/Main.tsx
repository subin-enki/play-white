/* eslint-disable react/no-unknown-property */

import { Suspense } from 'react';
import editorDarkImg from '@/assets/editor-dark.png';
import editorImg from '@/assets/editor.png';
import { useThemeContext } from '@/feature';
import { useMousePosition } from '@/hooks';
import { PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Floating3DObjects } from './Floating3DObjects';

export function Main() {
  const mousePosition = useMousePosition();
  const { theme } = useThemeContext();
  const isDark = theme === 'dark';

  return (
    <div className='relative h-screen w-full'>
      <img
        key={theme}
        src={isDark ? editorDarkImg : editorImg}
        className='absolute top-1/2 left-1/2 mx-auto h-auto w-1/2 max-w-full -translate-1/2 md:w-1/2'
      />
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={80} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 2]} intensity={1.2} />
        <directionalLight position={[-2, -1, 1]} intensity={1.2} />
        <pointLight position={[mousePosition.x * 2, mousePosition.y * 1.5, 3]} intensity={1} distance={8} decay={2} />
        <Suspense fallback={null}>
          <Floating3DObjects mousePosition={mousePosition} />
        </Suspense>
      </Canvas>
    </div>
  );
}
