import { AnimatePresence, motion } from 'framer-motion'
import { createContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { overlayAnimation, popupAnimation } from '../animations/modals'
import useSplittingHover from '../hooks/useSplittingHover'
import './navbar.scss'
import OpenBurger from './openBurger/openBurger'
import logo from '/logoSV.svg'

export const BurgerContext = createContext<React.Dispatch<React.SetStateAction<boolean>> | undefined>(undefined);

const Navbar = () => {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const logoRef = useRef<HTMLImageElement>(null);
    // const [shouldHideNavbar, setShouldHideNavbar] = useState(false);
    const [shouldHideNavbar] = useState(false);

    const location = useLocation();
    const pagesWithoutMixBlendMode = [''];
    
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
    // useEffect(() => {
    //     const navbar = document.querySelector('.navbar') as HTMLElement;
    //     const burger = document.querySelector('.burger') as HTMLElement;

    //     if (navbar && burger) {
    //         const shouldDisableMixBlendMode = pagesWithoutMixBlendMode.includes(location.pathname);

    //         if (isAboutPage || burger.classList.contains('burgerActive') || shouldDisableMixBlendMode) {
    //             navbar.style.mixBlendMode = 'normal';
    //         } else {
    //             navbar.style.mixBlendMode = 'normal'; // Можно вернуть difference если нужно
    //         }
    //     }
    // }, [isAboutPage, isBurgerOpen, location.pathname]);

    useSplittingHover();


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