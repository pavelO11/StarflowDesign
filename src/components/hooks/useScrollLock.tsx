// import { useLayoutEffect, useRef } from 'react'

// export default function useBodyScrollLock(isLocked: boolean) {
//   const scrollYRef = useRef(0);

//   useLayoutEffect(() => {
//     if (!isLocked) return;

//     scrollYRef.current = window.scrollY;
//     document.body.style.overflow = 'hidden';
//     document.body.style.position = 'fixed';
//     document.body.style.top = `-${scrollYRef.current}px`;
//     document.body.style.width = '100%';

//     return () => {
//       document.body.style.overflow = '';
//       document.body.style.position = '';
//       document.body.style.top = '';
//       document.body.style.width = '';
//       window.scrollTo(0, scrollYRef.current);
//     };
//   }, [isLocked]);
// }


// import { useLayoutEffect, useRef } from 'react'

// export default function useBodyScrollLock(isLocked: boolean) {
//   const scrollYRef = useRef(0);
  
//   useLayoutEffect(() => {
//     if (!isLocked) return;
    
//     scrollYRef.current = window.scrollY;
//     const originalStyle = window.getComputedStyle(document.body);
    
//     document.body.style.position = 'fixed';
//     document.body.style.top = `-${scrollYRef.current}px`;
//     document.body.style.left = '0';
//     document.body.style.right = '0';
//     document.body.style.overflow = 'hidden';
    
//     return () => {
//       document.body.style.position = originalStyle.position;
//       document.body.style.top = originalStyle.top;
//       document.body.style.left = originalStyle.left;
//       document.body.style.right = originalStyle.right;
//       document.body.style.overflow = originalStyle.overflow;
      
//       window.requestAnimationFrame(() => {
//         window.scrollTo(0, scrollYRef.current);
//       });
//     };
//   }, [isLocked]);
// }

// import { useLayoutEffect, useRef } from 'react'

// export default function useBodyScrollLock(isLocked: boolean) {
//   const scrollYRef = useRef(0);
//   const wasLockedRef = useRef(false);

//   useLayoutEffect(() => {
//     if (isLocked && !wasLockedRef.current) {
//       wasLockedRef.current = true;
//       scrollYRef.current = window.scrollY;
//       document.body.style.overflow = 'hidden';
//       document.body.style.position = 'fixed';
//       document.body.style.top = `-${scrollYRef.current}px`;
//       document.body.style.left = '0';
//       document.body.style.right = '0';
//       document.body.style.width = '100%';
//       if ((window as any).lenis) (window as any).lenis.stop();
//     }

//     if (!isLocked && wasLockedRef.current) {
//       wasLockedRef.current = false;
//       // Восстанавливаем стили
//       document.body.style.overflow = '';
//       document.body.style.top = '';
//       document.body.style.left = '';
//       document.body.style.right = '';
//       document.body.style.width = '';
//       // Восстанавливаем позицию скролла только если был сдвиг
//       if (scrollYRef.current !== 0) {
//         window.scrollTo(0, scrollYRef.current);
//       }
//       document.body.style.position = '';
//       if ((window as any).lenis) {
//         setTimeout(() => {
//           (window as any).lenis.start();
//           (window as any).lenis.scrollTo(scrollYRef.current, { immediate: true });
//         }, 0);
//       }
//     }

//     return () => {
//       if (wasLockedRef.current) {
//         wasLockedRef.current = false;
//         document.body.style.overflow = '';
//         document.body.style.top = '';
//         document.body.style.left = '';
//         document.body.style.right = '';
//         document.body.style.width = '';
//         if (scrollYRef.current !== 0) {
//           window.scrollTo(0, scrollYRef.current);
//         }
//         document.body.style.position = '';
//         if ((window as any).lenis) {
//           setTimeout(() => {
//             (window as any).lenis.start();
//             (window as any).lenis.scrollTo(scrollYRef.current, { immediate: true });
//           }, 0);
//         }
//       }
//     };
//   }, [isLocked]);
// }


import { useLayoutEffect, useRef } from 'react'

export default function useBodyScrollLock(isLocked: boolean) {
  const scrollYRef = useRef(0);
  const wasLockedRef = useRef(false);

  useLayoutEffect(() => {
    if (isLocked && !wasLockedRef.current) {
      wasLockedRef.current = true;
      scrollYRef.current = window.scrollY;
      document.body.style.overflow = 'hidden';
      // Не трогаем position/top/width!
      if ((window as any).lenis) (window as any).lenis.stop();
    }

    if (!isLocked && wasLockedRef.current) {
      wasLockedRef.current = false;
      document.body.style.overflow = '';
      // Возвращаем скролл только если он реально менялся
      if (window.scrollY !== scrollYRef.current) {
        window.requestAnimationFrame(() => {
          window.scrollTo(0, scrollYRef.current);
          if ((window as any).lenis) {
            (window as any).lenis.start();
            (window as any).lenis.scrollTo(scrollYRef.current, { immediate: true });
          }
        });
      } else {
        if ((window as any).lenis) (window as any).lenis.start();
      }
    }
    // eslint-disable-next-line
  }, [isLocked]);
}