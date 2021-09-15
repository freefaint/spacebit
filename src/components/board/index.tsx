import React, { useCallback, useState } from 'react';

import { Area } from './area';

interface BoardOperations {
  handlePlus: () => void;
  handleMinus: () => void;
  handleFit: () => void;
  handleOriginal: () => void;
}

export interface BoardProps {
  title?: React.ReactNode;
  operations?: (operations: BoardOperations) => React.ReactNode;
}

export const Board = ({ title, operations, children }: React.PropsWithChildren<BoardProps>) => {
  const [scale, setScale] = useState(0);
  const [startScale, setStartScale] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const handleInit = useCallback(
    (scale) => {
      setScale(scale);
      setStartScale(scale);
    },
    [scale],
  );

  const handlePlus = useCallback(() => {
    setScale(scale * 1.1);
  }, [scale]);

  const handleMinus = useCallback(() => {
    setScale(scale * 0.9);
  }, [scale]);

  const handleFit = useCallback(() => {
    setScale(startScale);
    setOffsetX(0);
    setOffsetY(0);
  }, [startScale]);

  const handleOriginal = useCallback(() => {
    setScale(1);
  }, [scale]);

  const handleMove = useCallback(
    (x: number, y: number) => {
      setOffsetX((offsetX) => offsetX + x);
      setOffsetY((offsetY) => offsetY + y);
    },
    [scale],
  );

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexGrow: 1,
        backgroundColor: '#f2f6fa',
      }}
    >
      <div
        style={{
          position: 'fixed',
          boxSizing: 'border-box',
          padding: '1rem',
          display: 'flex',
          width: '100%',
          zIndex: 1,
          justifyContent: 'space-between',
        }}
      >
        {title}

        {operations?.({ handleFit, handleMinus, handlePlus, handleOriginal })}
      </div>

      <div
        style={{
          position: 'fixed',
          boxSizing: 'border-box',
          padding: '0.25rem',
          display: 'flex',
          width: '100%',
          zIndex: 1,
          backgroundColor: 'rgba(0,0,0,0.25)',
          color: '#fff',
          opacity: 0.5,
          bottom: 0,
          fontFamily: 'monospace',
          fontSize: '0.625rem',
        }}
      >
        {Math.ceil(scale * 100)} %
      </div>

      <Area scale={scale} offsetX={offsetX} offsetY={offsetY} onInit={handleInit} onMove={handleMove}>
        {children}
      </Area>
    </div>
  );
};
