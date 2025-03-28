// import {
//     motion,
//     MotionValue,
//     useScroll,
//     useSpring,
//     useTransform
// } from "framer-motion"
// import { useEffect, useRef, useState } from "react"
// import { Helmet } from 'react-helmet'
// import { Link } from 'react-router-dom'
// import Splitting from 'splitting'
// import Curve from '../../components/layoutTransition'
// import NavigationProjects from '../../components/navigationProjects/navigationProjects'
// import './projects.scss'
// import arrowLeft from '/arrowLeft.svg'
// import arrowRight from '/arrowRight.svg'

// const projects = [
//     {
//         id: 1,
//         src: "/REAL_ESTATE.jpg",
//         first: "Real",
//         second: " Estatе",
//         order: "00-1",
//         link: "https://dprofile.ru/case/76591/real-estate"
//     },
//     {
//         id: 2,
//         src: "/SF_STORE.jpg",
//         first: "SF —",
//         second: " Storе",
//         order: "00-2",
//         link: "https://dprofile.ru/case/55727/perfume-shop"
//     },
//     {
//         id: 3,
//         src: "/DETAILING_STUDIO.jpg",
//         first: "Detailing",
//         second: " Studiо",
//         order: "00-3",
//         link: "https://dprofile.ru/case/47515/detailing-studio"
//     }
// ];

// // Хук для расчета параллакс-эффекта по оси Y
// function useParallax(value: MotionValue<number>, distance: number) {
//     return useTransform(value, [0, 1], [-distance, distance]);
// }

// interface ParallaxImageProps {
//   src: string;
//   onVisible: () => void;
// }

// const ParallaxImage: React.FC<ParallaxImageProps> = ({ src, onVisible }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({ target: ref });
//   const yRange = useParallax(scrollYProgress, 0);
//   // Сглаживаем значение для плавной анимации
//   const smoothY = useSpring(yRange, { stiffness: 100, damping: 20});

//   useEffect(() => {
//     const currentRef = ref.current;
//     if (!currentRef) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           onVisible();
//         }
//       },
//       { threshold: 0.3 }
//     );

//     observer.observe(currentRef);
//     return () => {
//       observer.unobserve(currentRef);
//     };
//   }, [onVisible]);

//   return (
//     <motion.div
//       ref={ref}
//       className="image-container"
//       style={{
//         backgroundImage: `url(${src})`,
//         y: smoothY
//       }}
//     />
//   );
// };

// const Projects: React.FC = () => {
//   const [currentProject, setCurrentProject] = useState(projects[0]);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const h1RefDesktop = useRef<HTMLHeadingElement>(null);
//   const pRefDesktop = useRef<HTMLParagraphElement>(null);
//   const h1RefMobile = useRef<HTMLHeadingElement>(null);
//   const pRefMobile = useRef<HTMLParagraphElement>(null);

//   // Анимация текста при скролле с использованием Splitting
//   useEffect(() => {
//     const initAnimation = (element: HTMLElement) => {
//       // Сохраняем оригинальный контент, сбрасываем анимацию
//       const originalContent = element.dataset.originalContent || element.innerHTML;
//       element.innerHTML = originalContent;
//       element.classList.remove("visible");
//       element.dataset.originalContent = originalContent;
//       // Применяем Splitting для разбиения текста на символы
//       Splitting({ target: element, by: "chars", ignore: ".static-text" });
//       // Запускаем анимацию
//       setTimeout(() => {
//         element.classList.add("visible");
//       }, 50);
//     };

//         if (window.innerWidth > 768) {
//             if (h1RefDesktop.current) initAnimation(h1RefDesktop.current);
//             if (pRefDesktop.current) initAnimation(pRefDesktop.current);
//         } else {
//             if (h1RefMobile.current) initAnimation(h1RefMobile.current);
//             if (pRefMobile.current) initAnimation(pRefMobile.current);
//         }

//     }, [currentProject]);

//     const handleProjectVisible = (id: number) => {
//         setTimeout(() => {
//           setCurrentProject(projects.find(p => p.id === id) || projects[0]);
//         }, 50); // Задержка в 100 мс
//       };

//   return (
//     <Curve>
//         <Helmet>
//           <title>Starflow Design - Портфолио</title>
//           <meta name="description" content="Ознакомьтесь с избранными работами Игоря Дубовцева, демонстрирующими опыт в UX & UI дизайне. Откройте для себя проекты, сочетающие эстетику, удобство и смыслы, направленные на усиление бизнеса." />
//         </Helmet>
//         <main className="projects-container" ref={containerRef}>
//         <NavigationProjects scrollContainerRef={containerRef} />
//         <section className="mainTextMobile">
//         <h1
//           key={currentProject.id}
//           ref={h1RefMobile}
//           className="slide-vertical"
//           data-splitting
//         >
//           <span className="firText">{currentProject.first}</span>
//           <span className="secText">{currentProject.second}</span>
//         </h1>
//         <div className="underMobile">
//           <div className="countProjects">
//             <p
//               key={currentProject.order}
//               ref={pRefMobile}
//               className="order"
//               data-splitting
//             >
//               {currentProject.order}
//               <span className="divider"></span>
//             </p>
//             <p>00-3</p>
//           </div>
//           <Link
//             className="goProject"
//             to={currentProject.link}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <div>
//               <img className="leftArrow" src={arrowLeft} alt="arrow" />
//               СМОТРЕТЬ КЕЙС
//               <img className="rightArrow" src={arrowRight} alt="arrow" />
//             </div>
//           </Link>
//         </div>
//       </section>
//       <section className="mainText">
//         <div className="countProjects">
//           <p
//             key={currentProject.order}
//             ref={pRefDesktop}
//             className="order"
//             data-splitting
//           >
//             {currentProject.order}
//             <span className="divider"></span>
//           </p>
//           <p>00-3</p>
//         </div>
//         <h1
//           key={currentProject.id}
//           ref={h1RefDesktop}
//           className="slide-vertical"
//           data-splitting
//         >
//           <span className="firText">{currentProject.first}</span>
//           <span className="secText">{currentProject.second}</span>
//         </h1>
//         <Link
//           className="goProject"
//           to={currentProject.link}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <div>
//             <img className="leftArrow" src={arrowLeft} alt="arrow" />
//             СМОТРЕТЬ КЕЙС
//             <img className="rightArrow" src={arrowRight} alt="arrow" />
//           </div>
//         </Link>
//       </section>
//       {projects.map((project) => (
//         <ParallaxImage
//           key={project.id}
//           src={project.src}
//           onVisible={() => handleProjectVisible(project.id)}
//         />
//       ))}
//     </main>
//     </Curve>
//   );
// };

// export default Projects;

// import { Helmet } from 'react-helmet'
// import { Link } from 'react-router-dom'
// import CustomCursor from '../../components/customCursor/CustomCursor'
// import useSplittingOnLoad from '../../components/hooks/useSplittingOnLoad'
// import Curve from '../../components/layoutTransition'
// import Navigation from '../../components/navigation/Navigation'
// import './projects.scss'

// import { useEffect, useState } from 'react'
// import arrowLeft from '/arrowLeft.svg'
// import arrowRight from '/arrowRight.svg'

// const projects = [
//   {
//     id: 1,
//     src: "/REAL_ESTATE.jpg",
//     first: "Real",
//     second: " Estate",
//     order: "00-1",
//     link: "https://dprofile.ru/case/76591/real-estate"
//   },
//   {
//     id: 2,
//     src: "/SF_STORE.jpg",
//     first: "SF —",
//     second: " Store",
//     order: "00-2",
//     link: "https://dprofile.ru/case/55727/perfume-shop"
//   },
//   {
//     id: 3,
//     src: "/DETAILING_STUDIO.jpg",
//     first: "Detailing",
//     second: " Studio",
//     order: "00-3",
//     link: "https://dprofile.ru/case/47515/detailing-studio"
//   }
// ];

// const Projects: React.FC = () => {
//     const [isVisible, setIsVisible] = useState(false); // fade first loading

//     useEffect(() => {
//             setTimeout(() => {
//                 setIsVisible(true);
//             }, 4800); // delay
//         }, []);

//     useSplittingOnLoad('.slide-vertical');

//   return (
//     <Curve>
//       <Helmet>
//         <title>Starflow Design - Портфолио</title>
//         <meta 
//           name="description" 
//           content="Ознакомьтесь с избранными работами Игоря Дубовцева, демонстрирующими опыт в UX & UI дизайне. Откройте для себя проекты, сочетающие эстетику, удобство и смыслы, направленные на усиление бизнеса." 
//         />
//       </Helmet>
//       <main className="projects-container">
//         {projects.map(project => (
//           <Link 
//             key={project.id} 
//             to={project.link} 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="image-link"
//           >
//             <section 
//               className="image-container" 
//               style={{ backgroundImage: `url(${project.src})` }}
//             >
//               <div className="mainText">
//                 <h1 data-splitting className="slide-vertical">
//                   <span className="firText">{project.first}</span>
//                   <span className="secText">{project.second}</span>
//                 </h1>
//               </div>
//               <div className="mainTextMobile">
//                 <h1 data-splitting className="slide-vertical">
//                   <span className="firText">{project.first}</span>
//                   <span className="secText">{project.second}</span>
//                 </h1>
//                 <Link
//                     className={`goProject ${isVisible ? 'fadeIn' : ''}`}
//                     key={project.id} 
//                     to={project.link} 
//                     target="_blank"
//                     rel="noopener noreferrer"
//                 >
//                 <div>
//                     <img className="leftArrow" src={arrowLeft} alt="arrow" />
//                         СМОТРЕТЬ КЕЙС
//                     <img className="rightArrow" src={arrowRight} alt="arrow" />
//                 </div>
//                 </Link>
//               </div>
//             </section>
//           </Link>
//         ))}
//         <Navigation/>
//         <CustomCursor />
//       </main>
//     </Curve>
//   );
// };

// export default Projects;

import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import CustomCursor from '../../components/customCursor/CustomCursor'
import useSplittingOnLoad from '../../components/hooks/useSplittingOnLoad'
import Curve from '../../components/layoutTransition'
import Navigation from '../../components/navigation/Navigation'
import './projects.scss'

import { useEffect, useState } from 'react'
import arrowLeft from '/arrowLeft.svg'
import arrowRight from '/arrowRight.svg'

const Projects: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false); // fade first loading

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true);
        }, 4800); // delay
    }, []);

    useSplittingOnLoad('.slide-vertical');

    return (
        <Curve>
            <Helmet>
                <title>Starflow Design - Портфолио</title>
                <meta
                    name="description"
                    content="Ознакомьтесь с избранными работами Игоря Дубовцева, демонстрирующими опыт в UX & UI дизайне. Откройте для себя проекты, сочетающие эстетику, удобство и смыслы, направленные на усиление бизнеса."
                />
            </Helmet>
            <main className="projects-container">
                <Link
                    to="https://dprofile.ru/case/76591/real-estate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="image-link"
                >
                    <section
                        className="image-container"
                        style={{ backgroundImage: `url(/REAL_ESTATE.jpg)` }}
                    >
                        <div className="mainText">
                            <h1 data-splitting className="slide-vertical">
                                <span className="firText">Real</span>
                                <span className="secText"> Estate</span>
                            </h1>
                        </div>
                        <div className="mainTextMobile">
                            <h1 data-splitting className="slide-vertical">
                                <span className="firText">Real</span>
                                <span className="secText"> Estate</span>
                            </h1>
                            <Link
                                className={`goProject ${isVisible ? 'fadeIn' : ''}`}
                                to="https://dprofile.ru/case/76591/real-estate"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div>
                                    <img className="leftArrow" src={arrowLeft} alt="arrow" />
                                    СМОТРЕТЬ КЕЙС
                                    <img className="rightArrow" src={arrowRight} alt="arrow" />
                                </div>
                            </Link>
                        </div>
                    </section>
                </Link>

                <Link
                    to="https://dprofile.ru/case/55727/perfume-shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="image-link"
                >
                    <section
                        className="image-container"
                        style={{ backgroundImage: `url(/SF_STORE.jpg)` }}
                    >
                        <div className="mainText">
                            <h1 data-splitting className="slide-vertical">
                                <span className="firText">SF —</span>
                                <span className="secText"> Store</span>
                            </h1>
                        </div>
                        <div className="mainTextMobile">
                            <h1 data-splitting className="slide-vertical">
                                <span className="firText">SF —</span>
                                <span className="secText"> Store</span>
                            </h1>
                            <Link
                                className={`goProject ${isVisible ? 'fadeIn' : ''}`}
                                to="https://dprofile.ru/case/55727/perfume-shop"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div>
                                    <img className="leftArrow" src={arrowLeft} alt="arrow" />
                                    СМОТРЕТЬ КЕЙС
                                    <img className="rightArrow" src={arrowRight} alt="arrow" />
                                </div>
                            </Link>
                        </div>
                    </section>
                </Link>

                <Link
                    to="https://dprofile.ru/case/47515/detailing-studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="image-link"
                >
                    <section
                        className="image-container"
                        style={{ backgroundImage: `url(/DETAILING_STUDIO.jpg)` }}
                    >
                        <div className="mainText">
                            <h1 data-splitting className="slide-vertical">
                                <span className="firText">Detailing</span>
                                <span className="secText"> Studio</span>
                            </h1>
                        </div>
                        <div className="mainTextMobile">
                            <h1 data-splitting className="slide-vertical">
                                <span className="firText">Detailing</span>
                                <span className="secText"> Studio</span>
                            </h1>
                            <Link
                                className={`goProject ${isVisible ? 'fadeIn' : ''}`}
                                to="https://dprofile.ru/case/47515/detailing-studio"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div>
                                    <img className="leftArrow" src={arrowLeft} alt="arrow" />
                                    СМОТРЕТЬ КЕЙС
                                    <img className="rightArrow" src={arrowRight} alt="arrow" />
                                </div>
                            </Link>
                        </div>
                    </section>
                </Link>

                <Navigation />
                <CustomCursor />
            </main>
        </Curve>
    );
};

export default Projects;