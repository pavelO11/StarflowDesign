// import { useEffect, useState } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import useSplittingHover from '../hooks/useSplittingHover'
// import '../navigation/navigation.scss'

// interface NavigationProjectsProps {
//   scrollContainerRef: React.RefObject<HTMLElement>
// }

// function NavigationProjects({ scrollContainerRef }: NavigationProjectsProps) {
//   const [isHidden, setIsHidden] = useState(false)
//   const [isVisible, setIsVisible] = useState(false)
//   const [isTransitioning, setIsTransitioning] = useState(false)
//   const location = useLocation()

//   // Обработка событий прокрутки и касаний
//   useEffect(() => {
//     const container = scrollContainerRef.current
//     if (!container) return

//     let lastY = 0
//     let touchStartY = 0

//     const handleWheel = (e: WheelEvent) => {
//       if (e.deltaY > 0) {
//         setIsHidden(true)
//       } else {
//         setIsHidden(false)
//       }
//     }

//     const handleTouchStart = (e: TouchEvent) => {
//       touchStartY = e.touches[0].clientY
//       lastY = touchStartY
//     }

//     const handleTouchMove = (e: TouchEvent) => {
//       const currentY = e.touches[0].clientY
//       const deltaY = currentY - lastY

//       if (deltaY < 0) {
//         setIsHidden(true)
//       } else {
//         setIsHidden(false)
//       }
//       lastY = currentY
//     }

//     container.addEventListener('wheel', handleWheel)
//     container.addEventListener('touchstart', handleTouchStart)
//     container.addEventListener('touchmove', handleTouchMove)

//     return () => {
//       container.removeEventListener('wheel', handleWheel)
//       container.removeEventListener('touchstart', handleTouchStart)
//       container.removeEventListener('touchmove', handleTouchMove)
//     }
//   }, [scrollContainerRef])

//   useEffect(() => {
//     const handleNavHomeClicked = () => {
//         setIsTransitioning(true);
//     };
//     window.addEventListener('navHomeClicked', handleNavHomeClicked);
//     return () => {
//         window.removeEventListener('navHomeClicked', handleNavHomeClicked);
//     };
// }, []);

//   // Задержка первоначального появления
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsVisible(true)
//     }, 3800)
//     return () => clearTimeout(timer)
//   }, [])

//   useSplittingHover()

//   const handleLinkClick = (link: string) => {
//     if (location.pathname === link) return
//     setIsTransitioning(true)
//   }
//   useSplittingHover();

//   const linksMain = [
//     { id: '1', number: '00-1', title: 'Проекты', link: '/projects' },
//     { id: '2', number: '00-2', title: 'Услуги', link: '/services' },
//     { id: '3', number: '00-3', title: 'Обо мне', link: '/about' },
//     { id: '4', number: '00-4', title: 'Контакты', link: '/contacts' },
//   ];

//   return (
//     <section className={`navigationSection ${isVisible ? (isHidden ? 'fadeOut' : 'fadeIn') : ''} ${isTransitioning ? 'fadeOut' : ''}`}>
//       {linksMain.map((link) => (
//         <Link
//           data-splitting
//           to={link.link}
//           onClick={() => handleLinkClick(link.link)}
//           key={link.id}
//         >
//           <p className="upperText">{link.number}</p>
//           <p className="navigationLink">{link.title}</p>
//         </Link>
//       ))}
//       <p className="navigationText">©2025</p>
//     </section>
//   );
// }

// export default NavigationProjects;