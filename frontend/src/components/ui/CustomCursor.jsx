import { useEffect, useRef, useState } from 'react';
import { useIsTouch } from '../../hooks/useMediaQuery';

const CustomCursor = () => {
  const isTouch = useIsTouch();
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    if (isTouch) {
      document.body.classList.remove('custom-cursor-active');
      return undefined;
    }

    document.body.classList.add('custom-cursor-active');

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e) => {
      const interactive = e.target.closest('[data-cursor="hover"]');
      setHovering(Boolean(interactive));
    };

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        aria-hidden
      >
        <div
          className={`rounded-full border border-white/80 transition-all duration-300 ease-out ${
            hovering ? 'w-14 h-14 opacity-60' : 'w-10 h-10 opacity-40'
          }`}
          style={{ boxShadow: '0 0 24px rgba(167,139,250,0.5)' }}
        />
      </div>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[10000] -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        <div
          className={`rounded-full bg-white transition-all duration-200 ${
            hovering ? 'w-2 h-2 opacity-90' : 'w-1.5 h-1.5 opacity-70'
          }`}
          style={{ mixBlendMode: 'difference' }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
