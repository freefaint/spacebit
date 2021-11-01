import React, { useRef, useEffect, useState } from 'react';

interface AreaProps {
  scale: number;
  offsetX: number;
  offsetY: number;
  onInit: (scale: number) => void;
  onMove?: (x: number, y: number) => void;
  onScale?: (plus?: boolean) => void;
}

export const Area = ({
  children,
  scale,
  offsetX,
  offsetY,
  onScale,
  onInit,
  onMove,
}: React.PropsWithChildren<AreaProps>) => {
  const [moving, setMoving] = useState(false);

  const screenRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: any) => {
    onMove?.(e.movementX / scale, e.movementY / scale);
  };

  const handleMouseUp = () => {
    setMoving(false);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
  };

  const handleMouseDown = () => {
    setMoving(true);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
  };

  const handleWheel = (e: WheelEvent) => {
    console.log('wheel', e);
  };

  useEffect(() => {
    if (screenRef.current && contentRef.current) {
      onInit(
        Math.min(
          (screenRef.current.offsetHeight - 120) / contentRef.current.scrollHeight,
          (screenRef.current.offsetWidth - 120) / (contentRef.current.scrollWidth * 2),
        ),
      );
    }
  }, [screenRef, contentRef]);

  useEffect(() => {
    screenRef.current?.removeEventListener('mousedown', handleMouseDown);
    screenRef.current?.addEventListener('mousedown', handleMouseDown);
    screenRef.current?.addEventListener('wheel', handleWheel);

    return () => {
      screenRef.current?.removeEventListener('mousedown', handleMouseDown);
    };
  }, [scale]);

  return (
    <div
      ref={screenRef}
      style={{
        overflow: 'hidden',
        flexDirection: 'column',
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        cursor: moving ? 'grabbing' : 'grab',
      }}
    >
      <div
        ref={contentRef}
        style={{
          width: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: !moving ? 'all 200ms ease-out' : 'none',
          transform: `scale(${scale ?? 1}) translate(${offsetX ?? 0}px, ${offsetY ?? 0}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
