import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const revealOnScroll = (selector, options = {}) => {
  const elements = gsap.utils.toArray(selector);
  elements.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: options.y ?? 48 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration ?? 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: options.start ?? 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
};
