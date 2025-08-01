import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './openBurger.scss'

import { useContext } from 'react'
import { BurgerContext } from '../Navbar'

import { AnimatePresence } from 'framer-motion'
import PopupBrif from '../../popupbrif/PopupBrif'

const OpenBurger = () => {
    const setIsBurgerOpen = useContext(BurgerContext);
    const [brifOpened, setBrifOpened] = useState(false);
    const location = useLocation();

    const contextClick = () => {
        if (setIsBurgerOpen) {
            setTimeout(() => {
                setIsBurgerOpen(false);
            }, 100); // Закрытие через 300 мс
        }
    };
    
    const handleOpenPopup = () => {
        setBrifOpened(true);
    };

    const pageText = {
        '/projects': 'Проекты',
        '/services': 'Услуги',
        '/about': 'Обо мне',
        '/contacts': 'Контакты',
    };

    // useScrollLock(true);
    
    return (
        <>
            <AnimatePresence mode="wait">
                {brifOpened && (
                <PopupBrif
                    opened={brifOpened}
                    onClose={() => setBrifOpened(false)}
                    selectedService={null}
                />
                )}
            </AnimatePresence>
            <section className='burgerContent'>
                <nav>
                    {Object.entries(pageText).map(([path, text]) => (
                        <Link
                            key={path}
                            onClick={contextClick}
                            className={`navLink ${location.pathname === path ? 'italicText' : ''}`}
                            to={path}
                        >
                            <section className='linkContent'>
                                {text}
                            </section>
                        </Link>
                    ))}
                </nav>
                <section className='lowerSection'>
                    <article>
                        <Link to='https://t.me/StarflowDesign' target='_blank' rel='noopener noreferrer' className='contactButtons'>
                            <p>СВЯЗАТЬСЯ<br />СО МНОЙ</p>
                            <span className='discription'>( телеграм )</span>
                        </Link>
                        <a onClick={handleOpenPopup} className='contactButtons'>
                            <p>ЗАПОЛНИТЬ<br />БРИФ</p>
                            <span className='discription'>( небольшой )</span>
                        </a>
                    </article>
                    <ul className='ulPortfolio'>
                        <Link data-splitting className='ul_link' to='https://dprofile.ru/starflowdesign' target="_blank" rel="noopener noreferrer">DPROFILE</Link>
                        <Link data-splitting className='ul_link' to='https://www.instagram.com/igor.dubovtsev.ui/' target="_blank" rel="noopener noreferrer">INSTAGRAM</Link>
                        <Link data-splitting className='ul_link' to='https://t.me/StaflowDesign ' target="_blank" rel="noopener noreferrer">TELEGRAM</Link>
                        </ul>
                    <footer>
                        <Link className='footerLinkFirst' to='mailto:starflowdesign@gmail.com' target='_blank' rel='noopener noreferrer'>Рабочая почта<br />starflowdesign@gmail.com</Link>
                        <ul className='links'>
                            <Link data-splitting className='ul_link' to='https://dprofile.ru/starflowdesign' target="_blank" rel="noopener noreferrer">DPROFILE</Link>
                            <Link data-splitting className='ul_link' to='https://www.instagram.com/igor.dubovtsev.ui/' target="_blank" rel="noopener noreferrer">INSTAGRAM</Link>
                            <Link data-splitting className='ul_link' to='https://t.me/StaflowDesign' target="_blank" rel="noopener noreferrer">TELEGRAM</Link>
                        </ul>
                        <Link className='footerLinkSecond' to='https://github.com/pavelO11' target="_blank" rel='noopener noreferrer'>Верстка сайта<br />@pavelO11</Link>
                    </footer>
                </section>
            </section>
        </>
    );
}

export default OpenBurger;