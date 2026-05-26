import { useEffect, useState } from 'react';

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    media.addEventListener('change', handler);
    setMatches(media.matches);
    return () => media.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

export const useIsMobile = () => useMediaQuery('(max-width: 768px)');
export const useIsTouch = () => useMediaQuery('(pointer: coarse)');
