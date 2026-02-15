/* eslint-disable react/no-unknown-property */

import { useRef, useMemo, useState, useEffect } from 'react';
import { Mesh, TextureLoader, Vector3 } from 'three';
import click3dImg from '@/assets/click-3d.png';
import star3dImg from '@/assets/santa-3d.png';
import w3dImg from '@/assets/w-3d.png';
import { useFrame, useLoader, useThree } from '@react-three/fiber';

interface Floating3DObjectsProps {
  mousePosition: { x: number; y: number };
}

interface ObjectState {
  position: Vector3;
  velocity: Vector3;
  basePosition: Vector3;
  targetPosition: Vector3;
  radius: number;
  isDragging: boolean;
  hasBeenDragged: boolean; // 사용자가 드래그했는지 여부
}

export function Floating3DObjects({ mousePosition }: Floating3DObjectsProps) {
  const wRef = useRef<Mesh>(null);
  const cursorRef = useRef<Mesh>(null);
  const starRef = useRef<Mesh>(null);

  const { camera, size } = useThree();

  // 드래그 상태 관리
  const [draggedObject, setDraggedObject] = useState<string | null>(null);
  const dragOffset = useRef<Vector3>(new Vector3(0, 0, 0));

  // ============================================
  // 초기 위치 설정
  // ============================================
  // 각 오브젝트의 물리 상태 (useRef로 관리하여 리렌더링 방지)
  // 초기 위치를 화면 전체에 분산 배치
  const wState = useRef<ObjectState>({
    position: new Vector3(2.2, 1.5, 1.5), // 우측 상단 - Green W icon
    velocity: new Vector3(0, 0, 0),
    basePosition: new Vector3(2.2, 1.5, 1.5),
    targetPosition: new Vector3(2.2, 1.5, 1.5),
    radius: 0.5,
    isDragging: false,
    hasBeenDragged: false,
  });

  const cursorState = useRef<ObjectState>({
    position: new Vector3(-2.0, 0.2, 1.2), // 모니터 왼쪽, 중간 높이 - White cursor icon
    velocity: new Vector3(0, 0, 0),
    basePosition: new Vector3(-2.0, 0.2, 1.2),
    targetPosition: new Vector3(-2.0, 0.2, 1.2),
    radius: 0.5,
    isDragging: false,
    hasBeenDragged: false,
  });

  const starState = useRef<ObjectState>({
    position: new Vector3(2.5, -1.8, 0.9), // 우측 하단 - (x, y, z) 좌표로 조절
    velocity: new Vector3(0, 0, 0),
    basePosition: new Vector3(2.5, -1.8, 0.9),
    targetPosition: new Vector3(2.5, -1.8, 0.9),
    radius: 0.5,
    isDragging: false,
    hasBeenDragged: false,
  });

  // Load 3D images as textures
  const wTexture = useLoader(TextureLoader, w3dImg);
  const clickTexture = useLoader(TextureLoader, click3dImg);
  const starTexture = useLoader(TextureLoader, star3dImg);

  // Calculate aspect ratios for each image
  const wAspectRatio = useMemo(() => {
    if (wTexture && wTexture.image) {
      return (wTexture.image.width * 1.5) / (wTexture.image.height * 1.5);
    }
    return 1;
  }, [wTexture]);

  const clickAspectRatio = useMemo(() => {
    if (clickTexture && clickTexture.image) {
      return (clickTexture.image.width || 1) / (clickTexture.image.height || 1);
    }
    return 1;
  }, [clickTexture]);

  const starAspectRatio = useMemo(() => {
    if (starTexture && starTexture.image) {
      return (starTexture.image.width || 1) / (starTexture.image.height || 1);
    }
    return 1;
  }, [starTexture]);

  // 화면 경계 계산 (카메라 거리 기반)
  const getBounds = () => {
    const distance = camera.position.z;
    const fov = ('fov' in camera ? camera.fov : 50) * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * distance;
    const width = height * (size.width / size.height);
    return {
      left: -width / 2,
      right: width / 2,
      top: height / 2,
      bottom: -height / 2,
      front: 0.5,
      back: 2.0,
    };
  };

  // 벽 충돌 감지 및 반발
  const checkWallCollision = (obj: ObjectState, bounds: ReturnType<typeof getBounds>) => {
    const bounce = 0.8; // 탱탱볼 반발 계수
    const minBounceSpeed = 0.5; // 최소 반발 속도

    // X축 경계
    if (obj.position.x - obj.radius < bounds.left) {
      obj.position.x = bounds.left + obj.radius;
      // 벽에 부딪혔을 때 반대 방향으로 반발 (속도가 0이어도 반발)
      const currentSpeed = Math.abs(obj.velocity.x);
      obj.velocity.x = Math.max(currentSpeed * bounce, minBounceSpeed);
    } else if (obj.position.x + obj.radius > bounds.right) {
      obj.position.x = bounds.right - obj.radius;
      // 벽에 부딪혔을 때 반대 방향으로 반발 (속도가 0이어도 반발)
      const currentSpeed = Math.abs(obj.velocity.x);
      obj.velocity.x = -Math.max(currentSpeed * bounce, minBounceSpeed);
    }

    // Y축 경계
    if (obj.position.y - obj.radius < bounds.bottom) {
      obj.position.y = bounds.bottom + obj.radius;
      // 벽에 부딪혔을 때 반대 방향으로 반발 (속도가 0이어도 반발)
      const currentSpeed = Math.abs(obj.velocity.y);
      obj.velocity.y = Math.max(currentSpeed * bounce, minBounceSpeed);
    } else if (obj.position.y + obj.radius > bounds.top) {
      obj.position.y = bounds.top - obj.radius;
      // 벽에 부딪혔을 때 반대 방향으로 반발 (속도가 0이어도 반발)
      const currentSpeed = Math.abs(obj.velocity.y);
      obj.velocity.y = -Math.max(currentSpeed * bounce, minBounceSpeed);
    }

    // Z축 경계
    if (obj.position.z < bounds.front) {
      obj.position.z = bounds.front;
      // 벽에 부딪혔을 때 반대 방향으로 반발 (속도가 0이어도 반발)
      const currentSpeed = Math.abs(obj.velocity.z);
      obj.velocity.z = Math.max(currentSpeed * bounce, minBounceSpeed);
    } else if (obj.position.z > bounds.back) {
      obj.position.z = bounds.back;
      // 벽에 부딪혔을 때 반대 방향으로 반발 (속도가 0이어도 반발)
      const currentSpeed = Math.abs(obj.velocity.z);
      obj.velocity.z = -Math.max(currentSpeed * bounce, minBounceSpeed);
    }
  };

  // 오브젝트 간 충돌 감지 및 반발력 계산 함수
  const checkCollision = (obj1: ObjectState, obj2: ObjectState) => {
    const distance = obj1.position.distanceTo(obj2.position);
    const minDistance = obj1.radius + obj2.radius;

    if (distance < minDistance && distance > 0.01) {
      // 충돌 발생
      const direction = new Vector3().subVectors(obj1.position, obj2.position).normalize();

      const overlap = minDistance - distance;
      const force = overlap * 0.8; // 탱탱볼 효과를 위해 힘 증가

      // 반발력 적용
      const push1 = direction.clone().multiplyScalar(force);
      const push2 = direction.clone().multiplyScalar(-force);

      obj1.velocity.add(push1);
      obj2.velocity.add(push2);

      // 위치 보정 (겹침 방지)
      const correction = direction.multiplyScalar(overlap * 0.5);
      obj1.position.add(correction);
      obj2.position.sub(correction);
    }
  };

  // 마우스 위치를 3D 공간 좌표로 변환 (Raycaster 사용)
  const mouseToWorld = (mouseX: number, mouseY: number, z: number) => {
    const x = (mouseX / size.width) * 2 - 1;
    const y = -(mouseY / size.height) * 2 + 1;
    const vector = new Vector3(x, y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = (z - camera.position.z) / dir.z;
    return camera.position.clone().add(dir.multiplyScalar(distance));
  };

  // 드래그 시작
  const handlePointerDown = (
    objectName: string,
    event: { stopPropagation: () => void; clientX: number; clientY: number }
  ) => {
    event.stopPropagation();
    setDraggedObject(objectName);

    const state =
      objectName === 'w' ? wState.current : objectName === 'cursor' ? cursorState.current : starState.current;

    state.isDragging = true;
    state.velocity.set(0, 0, 0); // 드래그 시작 시 속도 초기화

    // 드래그 오프셋 계산
    const worldPos = mouseToWorld(event.clientX, event.clientY, state.position.z);
    dragOffset.current.subVectors(state.position, worldPos);
  };

  // 전역 마우스 이벤트 리스너
  useEffect(() => {
    const handleMouseUp = () => {
      if (draggedObject) {
        const state =
          draggedObject === 'w' ? wState.current : draggedObject === 'cursor' ? cursorState.current : starState.current;
        state.isDragging = false;
        state.hasBeenDragged = true;
        // 드래그가 끝나면 현재 위치를 새로운 기준점으로 설정
        state.basePosition.copy(state.position);
        state.targetPosition.copy(state.position);
      }
      setDraggedObject(null);
    };

    if (draggedObject) {
      window.addEventListener('mouseup', handleMouseUp);
      return () => window.removeEventListener('mouseup', handleMouseUp);
    }
  }, [draggedObject]);

  // 드래그 중 (useFrame 내에서 처리)
  const updateDrag = () => {
    if (!draggedObject) return;

    const state =
      draggedObject === 'w' ? wState.current : draggedObject === 'cursor' ? cursorState.current : starState.current;

    if (state.isDragging) {
      // 마우스 위치를 3D 좌표로 변환
      const mouseX = ((mousePosition.x + 1) * size.width) / 2;
      const mouseY = ((-mousePosition.y + 1) * size.height) / 2;
      const worldPos = mouseToWorld(mouseX, mouseY, state.position.z);
      worldPos.add(dragOffset.current);

      state.targetPosition.copy(worldPos);
      state.position.lerp(worldPos, 0.5); // 즉시 반응
    }
  };

  // 드래그 종료
  const handlePointerUp = () => {
    if (draggedObject) {
      const state =
        draggedObject === 'w' ? wState.current : draggedObject === 'cursor' ? cursorState.current : starState.current;
      state.isDragging = false;
    }
    setDraggedObject(null);
  };

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const bounds = getBounds();

    // 드래그 업데이트
    updateDrag();

    // Lerp 팩터 (부드러운 전환)
    const lerpFactor = 0.15;

    // W - Upper right
    if (wRef.current && wState.current) {
      const baseZ = 1.0;

      // 풍선 효과 (항상 적용)
      const floatingZ = baseZ + Math.sin(time * 0.4) * 0.4;
      const floatingRotation = Math.cos(time * 0.3) * 0.3;

      // 드래그 중이 아닐 때는 현재 위치 유지, 풍선 효과만 적용
      if (!wState.current.isDragging) {
        wState.current.targetPosition.copy(wState.current.position);
        wState.current.targetPosition.z = floatingZ;
        wState.current.position.lerp(wState.current.targetPosition, lerpFactor);
      }

      // 속도 적용 및 감쇠
      wState.current.velocity.multiplyScalar(0.92);
      wState.current.position.add(wState.current.velocity.clone().multiplyScalar(delta * 10));

      // 벽 충돌 체크
      checkWallCollision(wState.current, bounds);

      // 메시 위치 업데이트
      wRef.current.position.copy(wState.current.position);
      wRef.current.rotation.z = floatingRotation;
      wRef.current.rotation.y = 0;
    }

    // Click (Cursor) - Lower left
    if (cursorRef.current && cursorState.current) {
      const baseZ = 1.2;

      // 풍선 효과 (항상 적용)
      const floatingZ = baseZ + Math.cos(time * 0.9) * 0.2;
      const floatingRotation = Math.cos(time * 0.3) * 0.3;

      // 드래그 중이 아닐 때는 현재 위치 유지, 풍선 효과만 적용
      if (!cursorState.current.isDragging) {
        cursorState.current.targetPosition.copy(cursorState.current.position);
        cursorState.current.targetPosition.z = floatingZ;
        cursorState.current.position.lerp(cursorState.current.targetPosition, lerpFactor);
      }

      // 속도 적용 및 감쇠
      cursorState.current.velocity.multiplyScalar(0.92);
      cursorState.current.position.add(cursorState.current.velocity.clone().multiplyScalar(delta * 10));

      // 벽 충돌 체크
      checkWallCollision(cursorState.current, bounds);

      // 메시 위치 업데이트
      cursorRef.current.position.copy(cursorState.current.position);
      cursorRef.current.rotation.z = floatingRotation;
      cursorRef.current.rotation.y = 0;
      cursorRef.current.rotation.x = 0;
    }

    // Star - Behind cursor / Lower right
    if (starRef.current && starState.current) {
      const baseZ = 0.9;

      // 풍선 효과 (항상 적용)
      const floatingZ = baseZ + Math.sin(time * 0.4) * 0.15;
      const floatingRotation = Math.cos(time * 0.3) * 0.3;

      // 드래그 중이 아닐 때는 현재 위치 유지, 풍선 효과만 적용
      if (!starState.current.isDragging) {
        starState.current.targetPosition.copy(starState.current.position);
        starState.current.targetPosition.z = floatingZ;
        starState.current.position.lerp(starState.current.targetPosition, lerpFactor);
      }

      // 속도 적용 및 감쇠
      starState.current.velocity.multiplyScalar(0.92);
      starState.current.position.add(starState.current.velocity.clone().multiplyScalar(delta * 10));

      // 벽 충돌 체크
      checkWallCollision(starState.current, bounds);

      // 메시 위치 업데이트
      starRef.current.position.copy(starState.current.position);
      starRef.current.rotation.z = floatingRotation;
      starRef.current.rotation.y = 0;
      starRef.current.rotation.x = 0;
    }

    // 오브젝트 간 충돌 감지 및 반발력 적용
    checkCollision(wState.current, cursorState.current);
    checkCollision(wState.current, starState.current);
    checkCollision(cursorState.current, starState.current);
  });

  return (
    <>
      {/* W - Upper right */}
      <mesh ref={wRef} onPointerDown={(e) => handlePointerDown('w', e)} onPointerUp={handlePointerUp}>
        <planeGeometry args={[2.5 * wAspectRatio, 2.5, 1, 1]} />
        <meshStandardMaterial map={wTexture} transparent alphaTest={0.1} depthWrite={false} />
      </mesh>

      {/* Click (Cursor) - Lower left */}
      <mesh ref={cursorRef} onPointerDown={(e) => handlePointerDown('cursor', e)} onPointerUp={handlePointerUp}>
        <planeGeometry args={[2 * clickAspectRatio, 2, 1, 1]} />
        <meshStandardMaterial map={clickTexture} transparent alphaTest={0.01} depthWrite={false} />
      </mesh>

      {/* Star - Behind cursor */}
      <mesh ref={starRef} onPointerDown={(e) => handlePointerDown('star', e)} onPointerUp={handlePointerUp}>
        <planeGeometry args={[2 * starAspectRatio, 2, 1, 1]} />
        <meshStandardMaterial map={starTexture} transparent alphaTest={0.1} depthWrite={false} />
      </mesh>
    </>
  );
}
