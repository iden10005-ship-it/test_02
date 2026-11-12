import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = '청소 전',
  afterLabel = '청소 후',
  aspectRatio = 'aspect-[16/9] md:aspect-[21/9]',
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-2xl shadow-2xl border border-white/20 group cursor-ew-resize ${aspectRatio} ${className}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Background layer - clean view) */}
      <img
        src={afterImage}
        alt="청소 후 깨끗한 유리창"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        loading="lazy"
      />

      {/* After Badge */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600/90 text-white text-xs font-bold backdrop-blur-md shadow-lg pointer-events-none tracking-wide">
        <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
        {afterLabel}
      </div>

      {/* Before Image (Clipped layer - dirty/dusty view) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="청소 전 오염된 유리창"
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{
            // Keep image width matching container size
            width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
            height: '100%',
          }}
          loading="lazy"
        />
        {/* Subtle grimy/dusty overlay on the 'Before' side for realism */}
        <div className="absolute inset-0 bg-amber-950/20 backdrop-contrast-125 pointer-events-none" />
      </div>

      {/* Before Badge */}
      <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-slate-900/80 text-slate-200 text-xs font-bold backdrop-blur-md shadow-lg pointer-events-none tracking-wide">
        {beforeLabel}
      </div>

      {/* Divider Line */}
      <div
        className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)] pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Center Drag Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl flex items-center justify-center border-2 border-blue-500 text-blue-600 transition-transform active:scale-95 group-hover:scale-105">
          <MoveHorizontal className="w-5 h-5 md:w-6 md:h-6" />
        </div>
      </div>

      {/* Interactive Helper Tooltip at Bottom */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3.5 py-1 rounded-full bg-black/60 text-white/90 text-[11px] font-medium backdrop-blur-md pointer-events-none flex items-center gap-1.5">
        <span>↔ 좌우로 드래그하여 전후 효과를 확인하세요</span>
      </div>
    </div>
  );
};
