import { motion } from 'framer-motion'
import React, { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
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
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

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

    useEffect(() => {
    const disableScroll = () => {  
      // Устанавливаем стили для блокировки прокрутки
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    };
  
    const enableScroll = () => {
      // Восстанавливаем стили
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.width = '';
  
      // Восстанавливаем прокрутку
      window.scrollTo(0, 0);
    };
  
    // Блокируем прокрутку при начале анимации
    disableScroll();
  
    // Убираем блокировку через 3 секунды
    const timer = setTimeout(() => {
      enableScroll();
    }, 3000);
  
    return () => {
      enableScroll();
      clearTimeout(timer);
    };
  }, [location.pathname]);

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
        delay: 3, // Задержка начала анимации текста
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
        delay: 3, // Задержка начала анимации SVG
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
        duration: 0.9,
        delay: 0.4,
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
      <motion.p {...anim(text)} className="loadingText">
        Starflow Design<span className="labelc">©</span>
      </motion.p>
      <section
        style={{ opacity: dimensions.width > 0 ? 0 : 1 }}
        className="background"
      ></section>
      {dimensions.width > 0 && (
        <motion.svg {...anim(svgSlide)}>
          <motion.path {...anim(svgCurve)} fill="#0f0f0f" />
        </motion.svg>
      )}
      {children}
    </motion.section>
  );
};

export default Curve;

// import { motion } from 'framer-motion'
// import React, { FC, useEffect, useState } from 'react'
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
//   const [isVisible, setIsVisible] = useState(false);

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
//     const disableScroll = () => {
//       const scrollTop = window.scrollY || document.documentElement.scrollTop;
//       const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
//       document.body.style.overflow = 'hidden';
//       document.body.style.position = 'fixed';
//       document.body.style.top = `-${scrollTop}px`;
//       document.body.style.left = `-${scrollLeft}px`;
//       document.body.style.width = '100%';
//     };

//     const enableScroll = () => {
//       document.body.style.overflow = '';
//       document.body.style.position = '';
//       document.body.style.top = '';
//       document.body.style.left = '';
//       document.body.style.width = '';
//       // window.scrollTo(scrollLeft, scrollTop);
//       window.scrollTo(0, 0);
//     };

//     disableScroll();
//     const timer = setTimeout(() => {
//       enableScroll();
//     }, 3000);

//     return () => {
//       enableScroll();
//       clearTimeout(timer);
//     };
//   }, [location.pathname]);

//   useEffect(() => {
//     setIsVisible(false);
//     const timer = setTimeout(() => {
//       setIsVisible(true);
//     }, 3000); // Задержка в 1.5 секунды
//     return () => clearTimeout(timer);
//   }, [location.pathname]);

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
//         duration: 0.9,
//         delay: 0.4,
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
//       style={{ backgroundColor, visibility: isVisible ? 'visible' : 'hidden' }}
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
//       {children}
//     </motion.section>
//   );
// };

// export default Curve;
