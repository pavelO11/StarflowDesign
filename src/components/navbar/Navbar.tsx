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
    const [shouldHideNavbar] = useState(false);

    const location = useLocation();

    // Анимация вращения логотипа при скролле
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

    useSplittingHover();

    useEffect(() => {
        const navbar = document.querySelector('.navbar') as HTMLElement;
        if (!navbar) return;
        if (location.pathname === '/' || location.pathname === '/services' || location.pathname === '/projects' || location.pathname === '/contacts') {
            navbar.classList.add('mix-blend-normal');
            navbar.classList.remove('mix-blend-difference');
            navbar.style.mixBlendMode = 'normal';
        } else {
            navbar.classList.remove('mix-blend-normal');
            navbar.style.mixBlendMode = '';
        }
    }, [location.pathname]);

    // shouldHidenav это для курсора на проектах
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
                                <OpenBurger isOpen={isBurgerOpen}/>
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