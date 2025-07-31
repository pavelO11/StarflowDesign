// import { AnimatePresence, motion } from 'framer-motion'
// import { createContext, useEffect, useRef, useState } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import { overlayAnimation, popupAnimation } from '../animations/modals'
// import useSplittingHover from '../hooks/useSplittingHover'
// import './navbar.scss'
// import OpenBurger from './openBurger/openBurger'
// import logo from '/logoSV.svg'

// export const BurgerContext = createContext<React.Dispatch<React.SetStateAction<boolean>> | undefined>(undefined);

// interface NavbarProps {
//     isAboutPage: boolean;
// }

// const Navbar = ({ isAboutPage }: NavbarProps) => {
//     const [isBurgerOpen, setIsBurgerOpen] = useState(false);
//     const logoRef = useRef<HTMLImageElement>(null);
//     const [shouldHideNavbar, setShouldHideNavbar] = useState(false);

//     const location = useLocation();
//     const pagesWithoutMixBlendMode = [''];

//     useEffect(() => {
//         const checkVisibility = () => {
//             const isDrawerVisible = document.querySelector('.drawer, .drawerSecond, .drawerThird');
//             const screenWidth = window.innerWidth;

//             if (screenWidth <= 1024 && isDrawerVisible) {
//                 setShouldHideNavbar(true);
//             } else {
//                 setShouldHideNavbar(false);
//             }
//         };

//         checkVisibility();
//         const observer = new MutationObserver(checkVisibility);
//         observer.observe(document.body, { childList: true, subtree: true });
//         window.addEventListener('resize', checkVisibility);

//         return () => {
//             observer.disconnect();
//             window.removeEventListener('resize', checkVisibility);
//         };
//     }, []);

//     useEffect(() => {
//         const handleScroll = () => {
//             const rotationSpeed = 0.1;
//             if (logoRef.current) {
//                 logoRef.current.style.transform = `rotate(${window.scrollY * rotationSpeed}deg)`;
//             }
//         };
//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     useEffect(() => {
//         const navbar = document.querySelector('.navbar') as HTMLElement;
//         const burger = document.querySelector('.burger') as HTMLElement;

//         if (navbar && burger) {
//             // Проверяем, находится ли текущая страница в списке pagesWithoutMixBlendMode
//             const shouldDisableMixBlendMode = pagesWithoutMixBlendMode.includes(location.pathname);

//             if (isAboutPage || burger.classList.contains('burgerActive') || shouldDisableMixBlendMode) {
//                 navbar.style.mixBlendMode = 'normal'; // Отключаем mix-blend-mode
//             } else {
//                 navbar.style.mixBlendMode = 'normal'; // Включаем mix-blend-mode WAS DIFFERENCE
//             }
//         }
//     }, [isAboutPage, isBurgerOpen, location.pathname]);

//     useSplittingHover();

//     useEffect(() => {
//     let hideTimer: NodeJS.Timeout;
    
//     const checkVisibility = () => {
//         const drawerElement = document.querySelector('.drawer, .drawerSecond, .drawerThird');
//         const screenWidth = window.innerWidth;
//         const burger = document.querySelector('.burger') as HTMLElement;
//         const logo = document.querySelector('.navbarBtn') as HTMLElement;

//         if (screenWidth <= 1024 && drawerElement) {
//             // Создаем IntersectionObserver для отслеживания видимости drawer
//             const observer = new IntersectionObserver((entries) => {
//                 // entries[0].intersectionRatio содержит процент видимости элемента (от 0 до 1)
//                 const visibilityPercentage = entries[0].intersectionRatio;
                
//                 // Если drawer виден хотя бы на 80%, скрываем элементы
//                 if (visibilityPercentage > 0.8) {
//                     setShouldHideNavbar(true);
                    
//                     // Плавное скрытие элементов в зависимости от % видимости drawer
//                     clearTimeout(hideTimer);
//                     hideTimer = setTimeout(() => {
//                         if (burger) {
//                             burger.style.display = 'none';
//                         }
//                         if (logo) {
//                             logo.style.display = 'none';
//                         }
//                     }, 300); // Уменьшенная задержка для более быстрой реакции
//                 } else {
//                     setShouldHideNavbar(false);
//                     clearTimeout(hideTimer);
                    
//                     if (burger) {
//                         burger.style.display = '';
//                     }
//                     if (logo) {
//                         logo.style.display = '';
//                     }
//                 }
//             }, {
//                 threshold: [0, 0.3, 0.5, 0.7, 1], // Отслеживаем разные пороги видимости
//                 root: null // Относительно области просмотра
//             });
            
//             // Начинаем наблюдение за drawer
//             observer.observe(drawerElement);
            
//             // Очищаем наблюдатель при размонтировании
//             return () => {
//                 observer.disconnect();
//             };
//         } else {
//             setShouldHideNavbar(false);
//             clearTimeout(hideTimer);
            
//             if (burger) {
//                 burger.style.display = '';
//             }
//             if (logo) {
//                 logo.style.display = '';
//             }
//         }
//     };

//     const mutationObserver = new MutationObserver(checkVisibility);
//     mutationObserver.observe(document.body, { childList: true, subtree: true });
//     window.addEventListener('resize', checkVisibility);

//     return () => {
//         mutationObserver.disconnect();
//         window.removeEventListener('resize', checkVisibility);
//         clearTimeout(hideTimer);
//     };
// }, []);

//     return (
//         // <nav className={`navbarSection ${shouldHideNavbar ? 'hidden' : ''}`}>
//         <nav className={`navbarSection${location.pathname === '/projects' ? ' projects-navbar' : ''}${shouldHideNavbar ? ' hidden' : ''}`}>
//             <Link
//                 data-splitting
//                 className='navbarBtn'
//                 to='/'
//                 onClick={() => {
//                     setIsBurgerOpen(false);
//                     window.dispatchEvent(new CustomEvent('navHomeClicked'));
//                 }}
                
//             >
//                 <img src={logo} alt='logo' ref={logoRef} />
//                 <section>
//                     Starflow<br />Design
//                 </section>
//             </Link>
//             <section
//                 className={`burger ${isBurgerOpen ? 'burgerActive' : ''}`}
//                 onClick={() => setIsBurgerOpen(!isBurgerOpen)}
//             >
//                 <span></span>
//                 {!isBurgerOpen && <span></span>}
//             </section>
//             {/* <AnimatePresence mode="wait">
//                 {isBurgerOpen && (
//                     <motion.section
//                         variants={burgerAnimation}
//                         initial="initial"
//                         animate="enter"
//                         exit="exit"
//                         className='openBurger'
//                     >
//                         <BurgerContext.Provider value={setIsBurgerOpen}>
//                             <OpenBurger />
//                         </BurgerContext.Provider>
//                     </motion.section>
//                 )}
//             </AnimatePresence> */}
//             <AnimatePresence mode="wait">
//                 {isBurgerOpen && (
//                     <motion.section
//                         variants={overlayAnimation}
//                         initial="initial"
//                         animate="enter"
//                         exit="exit"
//                         className="overlay"
//                         onClick={() => setIsBurgerOpen(false)}
//                     >
//                         <motion.section
//                             variants={popupAnimation}
//                             initial="initial"
//                             animate="enter"
//                             exit="exit"
//                             className='openBurger'
//                             onClick={e => e.stopPropagation()}
//                         >
//                             <BurgerContext.Provider value={setIsBurgerOpen}>
//                                 <OpenBurger />
//                             </BurgerContext.Provider>
//                         </motion.section>
//                     </motion.section>
//                 )}
//             </AnimatePresence>
//             <section className='welcome'>
//                 <span className='bracket1'>(</span>
//                 <p className='navbarText'>Открыт для любого<br></br>сотрудничества и предложений</p>
//                 <span className='bracket2'>)</span>
//             </section>
//             <Link
//                 data-splitting
//                 className="navbarTelegram"
//                 to="https://t.me/StarflowDesign"
//                 target="_blank"
//                 rel="noopener noreferrer"
//             >
//                 Написать в<br />телеграм
//             </Link>
//         </nav>
//     );
// };

// export default Navbar;

import { AnimatePresence, motion } from 'framer-motion'
import { createContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { overlayAnimation, popupAnimation } from '../animations/modals'
import useSplittingHover from '../hooks/useSplittingHover'
import './navbar.scss'
import OpenBurger from './openBurger/openBurger'
import logo from '/logoSV.svg'

export const BurgerContext = createContext<React.Dispatch<React.SetStateAction<boolean>> | undefined>(undefined);

interface NavbarProps {
    isAboutPage: boolean;
}

const Navbar = ({ isAboutPage }: NavbarProps) => {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const logoRef = useRef<HTMLImageElement>(null);
    const [shouldHideNavbar, setShouldHideNavbar] = useState(false);

    const location = useLocation();
    const pagesWithoutMixBlendMode = [''];

    // --- 1 убираем миксбледн когда открыт бургер и снова включаем = при открытие все збс ---
    // useEffect(() => {
    //     const navbar = document.querySelector('.navbar') as HTMLElement;
    //     const burger = document.querySelector('.burger') as HTMLElement;

    //     if (navbar && burger) {
    //         const isServicesPage = location.pathname === '/services';
    //         const shouldDisableMixBlendMode = pagesWithoutMixBlendMode.includes(location.pathname);

    //         if (isBurgerOpen || isAboutPage || shouldDisableMixBlendMode) {
    //             // Всегда нормальный режим при открытом бургере или на указанных страницах
    //             navbar.style.mixBlendMode = 'normal';
    //             navbar.classList.add('mix-blend-normal');
    //             navbar.classList.remove('mix-blend-difference');
    //         } else if (isServicesPage) {
    //             // На странице services при закрытом бургере используем difference с задержкой
    //             setTimeout(() => {
    //                 // Проверяем, не изменилось ли состояние за время задержки
    //                 if (!isBurgerOpen && isServicesPage) {
    //                     navbar.style.mixBlendMode = 'difference';
    //                     navbar.classList.add('mix-blend-difference');
    //                     navbar.classList.remove('mix-blend-normal');
    //                 }
    //             }, 350);
    //         } else {
    //             // На других страницах используем normal
    //             navbar.style.mixBlendMode = 'normal';
    //             navbar.classList.add('mix-blend-normal');
    //             navbar.classList.remove('mix-blend-difference');
    //         }
    //     }
    // }, [isAboutPage, isBurgerOpen, location.pathname]);
    useEffect(() => {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    const burger = document.querySelector('.burger') as HTMLElement;

    if (navbar && burger) {
        const isServicesPage = location.pathname === '/services';
        const shouldDisableMixBlendMode = pagesWithoutMixBlendMode.includes(location.pathname);

        if (isBurgerOpen || shouldDisableMixBlendMode) {
            // Обычный режим при открытом бургере или на указанных страницах
            navbar.style.mixBlendMode = 'normal';
            navbar.classList.add('mix-blend-normal');
            navbar.classList.remove('mix-blend-difference');
        } else if (isServicesPage) {
            // На страницах services и about при закрытом бургере используем difference с задержкой
            setTimeout(() => {
                if (!isBurgerOpen && (isServicesPage)) {
                    navbar.style.mixBlendMode = 'difference';
                    navbar.classList.add('mix-blend-difference');
                    navbar.classList.remove('mix-blend-normal');
                }
            }, 350);
        } else {
            // На других страницах используем normal
            navbar.style.mixBlendMode = 'normal';
            navbar.classList.add('mix-blend-normal');
            navbar.classList.remove('mix-blend-difference');
        }
    }
}, [isBurgerOpen, location.pathname]);

    // --- 2. Анимация вращения логотипа при скролле ---
    useEffect(() => {
        const handleScroll = () => {
            const rotationSpeed = 0.1;
            if (logoRef.current) {
                logoRef.current.style.transform = `rotate(${window.scrollY * rotationSpeed}deg)`;
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // --- 3. Mix-blend-mode логика ---
    useEffect(() => {
        const navbar = document.querySelector('.navbar') as HTMLElement;
        const burger = document.querySelector('.burger') as HTMLElement;

        if (navbar && burger) {
            const shouldDisableMixBlendMode = pagesWithoutMixBlendMode.includes(location.pathname);

            if (isAboutPage || burger.classList.contains('burgerActive') || shouldDisableMixBlendMode) {
                navbar.style.mixBlendMode = 'normal';
            } else {
                navbar.style.mixBlendMode = 'normal'; // Можно вернуть difference если нужно
            }
        }
    }, [isAboutPage, isBurgerOpen, location.pathname]);

    useSplittingHover();

    useEffect(() => {
    let hideTimer: NodeJS.Timeout;

    const checkVisibility = () => {
        const popupBrifDrawer = document.querySelector('.drawer, .drawerSecond, .drawerThird');
        const openBurger = document.querySelector('.openBurger');
        const screenWidth = window.innerWidth;
        const burger = document.querySelector('.burger') as HTMLElement;
        const logo = document.querySelector('.navbarBtn') as HTMLElement;

        // Скрываем navbar ТОЛЬКО если открыт popupBrif (drawer) на мобилке
        if (
            screenWidth <= 1024 &&
            popupBrifDrawer &&
            !openBurger // НЕ скрывать если открыт openBurger
        ) {
            setShouldHideNavbar(true);
            clearTimeout(hideTimer);
            hideTimer = setTimeout(() => {
                if (burger) burger.style.display = 'none';
                if (logo) logo.style.display = 'none';
            }, 300);
        } else {
            setShouldHideNavbar(false);
            clearTimeout(hideTimer);
            if (burger) burger.style.display = '';
            if (logo) logo.style.display = '';
        }
    };

    const mutationObserver = new MutationObserver(checkVisibility);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('resize', checkVisibility);

    checkVisibility();

    return () => {
        mutationObserver.disconnect();
        window.removeEventListener('resize', checkVisibility);
        clearTimeout(hideTimer);
    };
}, []);

    return (
        <nav className={`navbarSection${location.pathname === '/projects' ? ' projects-navbar' : ''}${shouldHideNavbar ? ' hidden' : ''}`}>
            <Link
                data-splitting
                className='navbarBtn'
                to='/'
                onClick={() => {
                    setIsBurgerOpen(false);
                    window.dispatchEvent(new CustomEvent('navHomeClicked'));
                }}
            >
                <img src={logo} alt='logo' ref={logoRef} />
                <section>
                    Starflow<br />Design
                </section>
            </Link>
            <section
                className={`burger ${isBurgerOpen ? 'burgerActive' : ''}`}
                onClick={() => setIsBurgerOpen(!isBurgerOpen)}
            >
                <span></span>
                {!isBurgerOpen && <span></span>}
            </section>
            <AnimatePresence mode="wait">
                {isBurgerOpen && (
                    <motion.section
                        variants={overlayAnimation}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        className="overlay"
                        onClick={() => setIsBurgerOpen(false)}
                    >
                        <motion.section
                            variants={popupAnimation}
                            initial="initial"
                            animate="enter"
                            exit="exit"
                            className='openBurger'
                            onClick={e => e.stopPropagation()}
                        >
                            <BurgerContext.Provider value={setIsBurgerOpen}>
                                <OpenBurger />
                            </BurgerContext.Provider>
                        </motion.section>
                    </motion.section>
                )}
            </AnimatePresence>
            <section className='welcome'>
                <span className='bracket1'>(</span>
                <p className='navbarText'>Открыт для любого<br />сотрудничества и предложений</p>
                <span className='bracket2'>)</span>
            </section>
            <Link
                data-splitting
                className="navbarTelegram"
                to="https://t.me/StarflowDesign"
                target="_blank"
                rel="noopener noreferrer"
            >
                Написать в<br />телеграм
            </Link>
        </nav>
    );
};

export default Navbar;

