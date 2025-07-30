// // заебумба
// import { motion } from 'framer-motion'
// import React, { FC, useCallback, useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom'
// import './layout.scss'

// interface CurveProps {
//   children: React.ReactNode;
//   backgroundColor?: string;
// }

// interface Dimensions {
//   width: number;
//   height: number;
// }

// const anim = (variants: any) => ({
//   initial: 'initial',
//   animate: 'enter',
//   exit: 'exit',
//   variants,
// });

// const Curve: FC<CurveProps> = ({ children, backgroundColor }) => {
//   const location = useLocation();
//   const [dimensions, setDimensions] = useState<Dimensions>({
//     width: 0,
//     height: 0,
//   });

//   const enableScroll = useCallback(() => {
//     document.body.style.overflow = '';
//     document.body.style.position = '';
//     document.body.style.top = '';
//     document.body.style.left = '';
//     document.body.style.width = '';
//     document.body.classList.remove('hide-cursor');
//     // Если используете кастомный скролл (Lenis), запустите его тут
//     if ((window as any).lenis) (window as any).lenis.start();
//   }, []);

//   // Корректно заблокировать скролл
//   const disableScroll = useCallback(() => {
//     const scrollY = window.scrollY;
//     window.scrollTo(0, 0);
//     document.body.style.overflow = 'hidden';
//     document.body.style.position = 'fixed';
//     document.body.style.top = `-${scrollY}px`;
//     document.body.style.left = '0';
//     document.body.style.width = '100%';
//     document.body.classList.add('hide-cursor');
//     // Если используете кастомный скролл (Lenis), остановите его тут
//     if ((window as any).lenis) (window as any).lenis.stop();
//   }, []);

//   const [showContent, setShowContent] = useState(false);
  
//   // Проверяем, первая ли это загрузка страницы
//   const [isPageRefresh, setIsPageRefresh] = useState(() => {
//     const hasPageLoaded = sessionStorage.getItem('pageLoaded');
//     return !hasPageLoaded; // true если первая загрузка, false если переход
//   });

//   // Первая загрузка (заставка)
//   useEffect(() => {
//     if (isPageRefresh) {
//       sessionStorage.setItem('pageLoaded', 'true');
//       disableScroll();
//       setShowContent(false);
//       const timer = setTimeout(() => {
//         enableScroll();
//         setShowContent(true);
//         setIsPageRefresh(false);
//         // Гарантируем, что скролл сверху
//         setTimeout(() => window.scrollTo(0, 0), 10);
//       }, 3800);
//       return () => {
//         clearTimeout(timer);
//         enableScroll();
//       };
//     } else {
//       setShowContent(true);
//       enableScroll();
//     }
//     // eslint-disable-next-line
//   }, [isPageRefresh, disableScroll, enableScroll]);

// //   // Переходы между страницами
// //   useEffect(() => {
// //     if (!isPageRefresh) {
// //       setShowContent(false);
// //       disableScroll();
// //       const timer = setTimeout(() => {
// //         enableScroll();
// //         setShowContent(true);
// //         setTimeout(() => window.scrollTo(0, 0), 10);
// //       }, 200);
// //       return () => {
// //         clearTimeout(timer);
// //         enableScroll();
// //       };
// //     }
// //     // eslint-disable-next-line
// //   }, [location.pathname]);

//   // Сбросить флаг при реальной перезагрузке
//   useEffect(() => {
//     const handleBeforeUnload = () => {
//       sessionStorage.removeItem('pageLoaded');
//     };
//     window.addEventListener('beforeunload', handleBeforeUnload);
//     return () => window.removeEventListener('beforeunload', handleBeforeUnload);
//   }, []);

//   useEffect(() => {
//     const resize = () => {
//       setDimensions({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };
//     resize();
//     window.addEventListener('resize', resize);
//     return () => window.removeEventListener('resize', resize);
//   }, []);

//   useEffect(() => {
//     if (showContent) window.scrollTo(0, 0);
//   }, [showContent]);

//   const text = {
//     initial: {
//       opacity: 1,
//       pointerEvents: 'auto',
//     },
//     enter: {
//       opacity: 0,
//       top: '-100px',
//       transition: {
//         duration: 0.9,
//         delay: 3,
//         ease: [0.76, 0, 0.24, 1],
//       },
//       transitionEnd: {
//         top: '58%',
//         pointerEvents: 'none',
//       },
//     },
//     exit: {
//       opacity: 1,
//       top: '50%',
//       transition: {
//         duration: 0.9,
//         delay: 0.4,
//         ease: [0.76, 0, 0.24, 1],
//       },
//     },
//   };

//   const svgSlide = {
//     initial: { top: '0px', zIndex: 51 },
//     enter: {
//       top: '-100vh',
//       transition: {
//         duration: 1,
//         delay: 3,
//         ease: [0.76, 0, 0.24, 1],
//       },
//       transitionEnd: {
//         top: '100vh',
//         zIndex: 'auto',
//       },
//     },
//     exit: {
//       top: '0px',
//       zIndex: 51,
//       transition: {
//         duration: 0.75,
//         ease: [0.76, 0, 0.24, 1],
//       },
//     },
//   };

//   const svgCurve = {
//     initial: { d: `M 0 0 L ${dimensions.width} 0 L ${dimensions.width} ${dimensions.height} L 0 ${dimensions.height} Z` },
//     enter: {
//       d: `M 0 0 L ${dimensions.width} 0 L ${dimensions.width} ${dimensions.height} L 0 ${dimensions.height} Z`,
//       transition: {
//         duration: 0.35,
//         ease: [0.76, 0, 0.24, 1],
//       },
//     },
//     exit: {
//       d: `M 0 0 L ${dimensions.width} 0 L ${dimensions.width} ${dimensions.height} L 0 ${dimensions.height} Z`,
//       transition: {
//         duration: 0.35,
//         ease: [0.76, 0, 0.24, 1],
//       },
//     },
//   };

//   return (
//         <motion.section
//             className="SectionPage"
//             style={{ backgroundColor }}
//             key={location.pathname}
//         >
//         {isPageRefresh && (
//             <>
//             <motion.p {...anim(text)} className="loadingText">
//                 Starflow Design<span className="labelc">©</span>
//             </motion.p>
//             <section
//                 style={{ opacity: dimensions.width > 0 ? 0 : 1 }}
//                 className="background"
//             >
//             </section>
//             {dimensions.width > 0 && (
//                 <motion.svg {...anim(svgSlide)}>
//                 <motion.path {...anim(svgCurve)} fill="#0f0f0f" />
//                 </motion.svg>
//             )}
//             </>
//         )}
//             <div 
//             style={{ 
//                 opacity: showContent ? 1 : 0, 
//                 visibility: showContent ? 'visible' : 'hidden',
//                 transition: 'opacity 0.3s ease'
//             }}
//             >
//             {children}
//             </div>
//         </motion.section>
//   );
// };

// export default Curve;


import { motion } from 'framer-motion'
import React, { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { usePageRefresh, usePageRefreshing, useShowContent } from '../context/PageRefreshContext'
import './layout.scss'

interface CurveProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

interface Dimensions {
  width: number;
  height: number;
}

const anim = (variants: any) => ({
  initial: 'initial',
  animate: 'enter',
  exit: 'exit',
  variants,
});

const Curve: FC<CurveProps> = ({ children, backgroundColor }) => {
  const location = useLocation();
  const isPageRefresh = usePageRefresh();
  const isPageRefreshing = usePageRefreshing();
  const showContent = useShowContent();
  
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  // Управление скроллом ТОЛЬКО на основе состояния контекста
  useEffect(() => {
    if (isPageRefreshing) {
      // Блокируем скролл
      const scrollY = window.scrollY;
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.width = '100%';
      document.body.classList.add('hide-cursor');
      if ((window as any).lenis) (window as any).lenis.stop();
    } else {
      // Разблокируем скролл
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.width = '';
      document.body.classList.remove('hide-cursor');
      if ((window as any).lenis) (window as any).lenis.start();
      setTimeout(() => window.scrollTo(0, 0), 10);
    }
  }, [isPageRefreshing]);

  // Обработка размеров окна
  useEffect(() => {
    const resize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Гарантируем скролл вверх при показе контента
  useEffect(() => {
    if (showContent) {
      window.scrollTo(0, 0);
    }
  }, [showContent]);

  // Очистка при размонтировании компонента
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.width = '';
      document.body.classList.remove('hide-cursor');
      if ((window as any).lenis) (window as any).lenis.start();
    };
  }, []);

  const text = {
    initial: {
      opacity: 1,
      pointerEvents: 'auto',
    },
    enter: {
      opacity: 0,
      top: '-100px',
      transition: {
        duration: 0.9,
        delay: 3,
        ease: [0.76, 0, 0.24, 1],
      },
      transitionEnd: {
        top: '58%',
        pointerEvents: 'none',
      },
    },
    exit: {
      opacity: 1,
      top: '50%',
      transition: {
        duration: 0.9,
        delay: 0.4,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const svgSlide = {
    initial: { top: '0px', zIndex: 51 },
    enter: {
      top: '-100vh',
      transition: {
        duration: 1,
        delay: 3,
        ease: [0.76, 0, 0.24, 1],
      },
      transitionEnd: {
        top: '100vh',
        zIndex: 'auto',
      },
    },
    exit: {
      top: '0px',
      zIndex: 51,
      transition: {
        duration: 0.75,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const svgCurve = {
    initial: { d: `M 0 0 L ${dimensions.width} 0 L ${dimensions.width} ${dimensions.height} L 0 ${dimensions.height} Z` },
    enter: {
      d: `M 0 0 L ${dimensions.width} 0 L ${dimensions.width} ${dimensions.height} L 0 ${dimensions.height} Z`,
      transition: {
        duration: 0.35,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      d: `M 0 0 L ${dimensions.width} 0 L ${dimensions.width} ${dimensions.height} L 0 ${dimensions.height} Z`,
      transition: {
        duration: 0.35,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <motion.section
      className="SectionPage"
      style={{ backgroundColor }}
      key={location.pathname}
    >
      {isPageRefresh && (
        <>
          <motion.p {...anim(text)} className="loadingText">
            Starflow Design<span className="labelc">©</span>
          </motion.p>
          <section
            style={{ opacity: dimensions.width > 0 ? 0 : 1 }}
            className="background"
          >
          </section>
          {dimensions.width > 0 && (
            <motion.svg {...anim(svgSlide)}>
              <motion.path {...anim(svgCurve)} fill="#0f0f0f" />
            </motion.svg>
          )}
        </>
      )}
      <div 
        style={{ 
          opacity: showContent ? 1 : 0, 
          visibility: showContent ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease'
        }}
      >
        {children}
      </div>
    </motion.section>
  );
};

export default Curve;



// 3 более менее рабочий вариант
// import { motion } from 'framer-motion'
// import React, { FC, useEffect, useRef, useState } from 'react'
// import { useLocation } from 'react-router-dom'
// import './layout.scss'

// interface CurveProps {
//   children: React.ReactNode;
//   backgroundColor?: string;
// }

// interface Dimensions {
//   width: number;
//   height: number;
// }

// const anim = (variants: any) => ({
//   initial: 'initial',
//   animate: 'enter',
//   exit: 'exit',
//   variants,
// });

// const Curve: FC<CurveProps> = ({ children, backgroundColor }) => {
//   const location = useLocation();
//   const [dimensions, setDimensions] = useState<Dimensions>({
//     width: 0,
//     height: 0,
//   });
//   // Управляем видимостью содержимого
//   const [showContent, setShowContent] = useState(false);
//   const contentRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const resize = () => {
//       setDimensions({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };
//     resize();
//     window.addEventListener('resize', resize);
//     return () => window.removeEventListener('resize', resize);
//   }, []);

//   useEffect(() => {
//     // Скрываем содержимое при смене страницы
//     setShowContent(false);
    
//     const disableScroll = () => {  
//       // Запоминаем текущую позицию скролла (для случая, если это не первая загрузка)
//       const scrollY = window.scrollY;
      
//       // Сбрасываем скролл в начало страницы
//       window.scrollTo(0, 0);
      
//       // Устанавливаем стили для блокировки прокрутки
//       document.body.style.overflow = 'hidden';
//       document.body.style.position = 'fixed';
//       document.body.style.top = `-${scrollY}px`;
//       document.body.style.left = '0';
//       document.body.style.width = '100%';
      
//       // Добавляем класс для скрытия курсора
//       document.body.classList.add('hide-cursor');
      
//       // Если используется Lenis, приостанавливаем его
//       if (window.lenis) {
//         window.lenis.stop();
//       }
//     };
  
//     const enableScroll = () => {
//       // Восстанавливаем стили
//       document.body.style.overflow = '';
//       document.body.style.position = '';
//       document.body.style.top = '';
//       document.body.style.left = '';
//       document.body.style.width = '';
      
//       // Убираем класс скрытия курсора
//       document.body.classList.remove('hide-cursor');
      
//       // Сбрасываем скролл в начало страницы перед показом контента
//       window.scrollTo({
//         top: 0,
//         left: 0,
//         behavior: 'instant' // Используем instant вместо smooth для мгновенного эффекта
//       });
      
//       // Показываем содержимое когда анимация завершена
//       setShowContent(true);
      
//       // Если используется Lenis, запускаем его снова
//       if (window.lenis) {
//         window.lenis.start();
//       }
      
//       // Дополнительно прокручиваем страницу вверх после короткой задержки,
//       // чтобы гарантировать позицию вверху после рендеринга контента
//       setTimeout(() => {
//         window.scrollTo({
//           top: 0,
//           left: 0,
//           behavior: 'instant'
//         });
//       }, 50);
//     };
  
//     // Блокируем прокрутку при начале анимации
//     disableScroll();
  
//     // Убираем блокировку через 3 секунды (или сколько длится ваша анимация)
//     const timer = setTimeout(() => {
//       enableScroll();
//     }, 3000);
  
//     return () => {
//       enableScroll();
//       clearTimeout(timer);
//     };
//   }, [location.pathname]);

//   // Эффект для обеспечения скролла вверх после отображения контента
//   useEffect(() => {
//     if (showContent && contentRef.current) {
//       window.scrollTo(0, 0);
      
//       // Дополнительная проверка через короткую задержку
//       setTimeout(() => {
//         window.scrollTo(0, 0);
//       }, 100);
//     }
//   }, [showContent]);

//   const text = {
//     initial: {
//       opacity: 1,
//       pointerEvents: 'auto',
//     },
//     enter: {
//       opacity: 0,
//       top: '-100px',
//       transition: {
//         duration: 0.9,
//         delay: 3, // Задержка начала анимации текста
//         ease: [0.76, 0, 0.24, 1],
//       },
//       transitionEnd: {
//         top: '58%',
//         pointerEvents: 'none',
//       },
//     },
//     exit: {
//       opacity: 1,
//       top: '50%',
//       transition: {
//         duration: 0.9,
//         delay: 0.4,
//         ease: [0.76, 0, 0.24, 1],
//       },
//     },
//   };

//   const svgSlide = {
//     initial: { top: '0px', zIndex: 51 },
//     enter: {
//       top: '-100vh',
//       transition: {
//         duration: 1,
//         delay: 3, // Задержка начала анимации SVG
//         ease: [0.76, 0, 0.24, 1],
//       },
//       transitionEnd: {
//         top: '100vh',
//         zIndex: 'auto',
//       },
//     },
//     exit: {
//       top: '0px',
//       zIndex: 51,
//       transition: {
//         duration: 0.75,
//         ease: [0.76, 0, 0.24, 1],
//       },
//     },
//   };

//   const svgCurve = {
//     initial: { d: `M 0 0 L ${dimensions.width} 0 L ${dimensions.width} ${dimensions.height} L 0 ${dimensions.height} Z` },
//     enter: {
//       d: `M 0 0 L ${dimensions.width} 0 L ${dimensions.width} ${dimensions.height} L 0 ${dimensions.height} Z`,
//       transition: {
//         duration: 0.35,
//         ease: [0.76, 0, 0.24, 1],
//       },
//     },
//     exit: {
//       d: `M 0 0 L ${dimensions.width} 0 L ${dimensions.width} ${dimensions.height} L 0 ${dimensions.height} Z`,
//       transition: {
//         duration: 0.35,
//         ease: [0.76, 0, 0.24, 1],
//       },
//     },
//   };

//   return (
//     <motion.section
//       className="SectionPage"
//       style={{ backgroundColor }}
//       key={location.pathname}
//     >
//       <motion.p {...anim(text)} className="loadingText">
//         Starflow Design<span className="labelc">©</span>
//       </motion.p>
//       <section
//         style={{ opacity: dimensions.width > 0 ? 0 : 1 }}
//         className="background"
//       ></section>
//       {dimensions.width > 0 && (
//         <motion.svg {...anim(svgSlide)}>
//           <motion.path {...anim(svgCurve)} fill="#0f0f0f" />
//         </motion.svg>
//       )}
//       {/* Показываем контент только после завершения анимации */}
//       <div 
//         ref={contentRef}
//         style={{ 
//           opacity: showContent ? 1 : 0, 
//           visibility: showContent ? 'visible' : 'hidden',
//           transition: 'opacity 0.3s ease'
//         }}
//       >
//         {children}
//       </div>
//     </motion.section>
//   );
// };

// export default Curve;