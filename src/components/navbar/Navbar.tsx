import { AnimatePresence, motion } from 'framer-motion'
import { createContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { burgerAnimation } from '../animations/modals'
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

    useEffect(() => {
        const checkVisibility = () => {
            const isDrawerVisible = document.querySelector('.drawer, .drawerSecond, .drawerThird');
            const screenWidth = window.innerWidth;

            if (screenWidth <= 1024 && isDrawerVisible) {
                setShouldHideNavbar(true);
            } else {
                setShouldHideNavbar(false);
            }
        };

        checkVisibility();
        const observer = new MutationObserver(checkVisibility);
        observer.observe(document.body, { childList: true, subtree: true });
        window.addEventListener('resize', checkVisibility);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', checkVisibility);
        };
    }, []);

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

    useEffect(() => {
        const navbar = document.querySelector('.navbar') as HTMLElement;
        const burger = document.querySelector('.burger') as HTMLElement;

        if (navbar && burger) {
            // Проверяем, находится ли текущая страница в списке pagesWithoutMixBlendMode
            const shouldDisableMixBlendMode = pagesWithoutMixBlendMode.includes(location.pathname);

            if (isAboutPage || burger.classList.contains('burgerActive') || shouldDisableMixBlendMode) {
                navbar.style.mixBlendMode = 'normal'; // Отключаем mix-blend-mode
            } else {
                navbar.style.mixBlendMode = 'difference'; // Включаем mix-blend-mode
            }
        }
    }, [isAboutPage, isBurgerOpen, location.pathname]);

    useSplittingHover();

    return (
        <nav className={`navbarSection ${shouldHideNavbar ? 'hidden' : ''}`}>
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
                        variants={burgerAnimation}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        className='openBurger'
                    >
                        <BurgerContext.Provider value={setIsBurgerOpen}>
                            <OpenBurger />
                        </BurgerContext.Provider>
                    </motion.section>
                )}
            </AnimatePresence>
            <section className='welcome'>
                <span className='bracket1'>(</span>
                <p className='navbarText'>Открыт для любого<br></br>сотрудничества и предложений</p>
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