import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './openBurger.scss'

import { useContext } from 'react'
import { BurgerContext } from '../Navbar'

import { AnimatePresence } from 'framer-motion'
import useScrollLock from '../../hooks/useScrollLock'
import PopupBrif from '../../popupbrif/PopupBrif'

const OpenBurger = () => {
    const setIsBurgerOpen = useContext(BurgerContext);
    const [brifOpened, setBrifOpened] = useState(false);
    const location = useLocation();

    const contextClick = () => {
        if (setIsBurgerOpen) {
            setTimeout(() => {
                setIsBurgerOpen(false);
            }, 2300); // Закрытие через 300 мс
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

    useScrollLock();
    
    return (
        <>
            <AnimatePresence mode='wait'>
                {brifOpened && <PopupBrif onClose={() => setBrifOpened(false)} selectedService={null} />}
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
                        <Link data-splitting className='ul_link' to='https://dribbble.com/StarflowDesign' target="_blank" rel="noopener noreferrer">DRIBBBLE</Link>
                        </ul>
                    <footer>
                        <Link className='footerLinkFirst' to='mailto:starflowdesign@gmail.com' target='_blank' rel='noopener noreferrer'>Рабочая почта<br />starflowdesign@gmail.com</Link>
                        <ul className='links'>
                            <Link data-splitting className='ul_link' to='https://dprofile.ru/starflowdesign' target="_blank" rel="noopener noreferrer">DPROFILE</Link>
                            <Link data-splitting className='ul_link' to='https://www.instagram.com/igor.dubovtsev.ui/' target="_blank" rel="noopener noreferrer">INSTAGRAM</Link>
                            <Link data-splitting className='ul_link' to='https://dribbble.com/StarflowDesign' target="_blank" rel="noopener noreferrer">DRIBBBLE</Link>
                        </ul>
                        <Link className='footerLinkSecond' to='https://github.com/p1baby' target="_blank" rel='noopener noreferrer'>Верстка сайта<br />@p1baby</Link>
                    </footer>
                </section>
            </section>
        </>
    );
}

export default OpenBurger;


// import { AnimatePresence } from 'framer-motion'
// import { useContext, useRef, useState } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import useScrollLock from '../../hooks/useScrollLock'
// import { useOutsideClick } from '../../popupbrif/outsideClick/useOutsideClick'
// import PopupBrif from '../../popupbrif/PopupBrif'
// import { BurgerContext } from '../Navbar'
// import './openBurger.scss'

// const OpenBurger = () => {
//     const setIsBurgerOpen = useContext(BurgerContext);
//     const [brifOpened, setBrifOpened] = useState(false);
//     const location = useLocation();
//     const burgerRef = useRef<HTMLElement>(null);

//     // Закрытие меню при клике вне области
//     useOutsideClick(() => {
//         if (setIsBurgerOpen) setIsBurgerOpen(false);
//     });

//     // Обработчик для ссылок с задержкой закрытия
//     const handleNavLinkClick = (e: React.MouseEvent) => {
//         e.stopPropagation();
//         setTimeout(() => {
//             if (setIsBurgerOpen) setIsBurgerOpen(false);
//         }, 1900); // Задержка для анимации
//     };

//     // Открытие PopupBrif
//     const handleOpenBrif = (e: React.MouseEvent) => {
//         e.stopPropagation();
//         setBrifOpened(true);
//     };

//     const pageText = {
//         '/projects': 'Проекты',
//         '/services': 'Услуги',
//         '/about': 'Обо мне',
//         '/contacts': 'Контакты',
//     };

//     useScrollLock();

//     return (
//         <>
//             <AnimatePresence>
//                 {brifOpened && (
//                     <PopupBrif 
//                         onClose={() => setBrifOpened(false)} 
//                         selectedService={null} 
//                     />
//                 )}
//             </AnimatePresence>

//             <section className="burgerContent" ref={burgerRef}>
//                 <nav>
//                     {Object.entries(pageText).map(([path, text]) => (
//                         <Link
//                             key={path}
//                             to={path}
//                             className={`navLink ${location.pathname === path ? 'italicText' : ''}`}
//                             onClick={handleNavLinkClick}
//                         >
//                             <section className="linkContent">{text}</section>
//                         </Link>
//                     ))}
//                 </nav>

//                 <section className="lowerSection">
//                     <article>
//                         <Link
//                             to="https://t.me/StarflowDesign"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="contactButtons"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <p>СВЯЗАТЬСЯ<br />СО МНОЙ</p>
//                             <span className="discription">( телеграм )</span>
//                         </Link>
//                         <button
//                             className="contactButtons"
//                             onClick={handleOpenBrif}
//                         >
//                             <p>ЗАПОЛНИТЬ<br />БРИФ</p>
//                             <span className="discription">( небольшой )</span>
//                         </button>
//                     </article>

//                     <ul className="ulPortfolio">
//                         {['DPROFILE', 'INSTAGRAM', 'DRIBBBLE'].map((link) => (
//                             <Link
//                                 key={link}
//                                 to="#"
//                                 className="ul_link"
//                                 onClick={(e) => e.preventDefault()}
//                             >
//                                 {link}
//                             </Link>
//                         ))}
//                     </ul>

//                     <footer>
//                         <Link
//                             className="footerLinkFirst"
//                             to="mailto:starflowdesign@gmail.com"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                         >
//                             Рабочая почта<br />
//                             starflowdesign@gmail.com
//                         </Link>
//                         <ul className="links">
//                             <Link
//                                 data-splitting
//                                 className="ul_link"
//                                 to="https://dprofile.ru/starflowdesign"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                             >
//                                 DPROFILE
//                             </Link>
//                             <Link
//                                 data-splitting
//                                 className="ul_link"
//                                 to="https://www.instagram.com/igor.dubovtsev.ui/"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                             >
//                                 INSTAGRAM
//                             </Link>
//                             <Link
//                                 data-splitting
//                                 className="ul_link"
//                                 to="https://dribbble.com/StarflowDesign"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                             >
//                                 DRIBBBLE
//                             </Link>
//                         </ul>
//                         <Link
//                             className="footerLinkSecond"
//                             to="https://github.com/p1baby"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                         >
//                             Верстка сайта<br />
//                             @p1baby
//                         </Link>
//                     </footer>
//                 </section>
//             </section>
//         </>
//     );
// };

// export default OpenBurger;