import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Splitting from 'splitting'
import { usePageRefresh, usePageRefreshing } from '../../context/PageRefreshContext'
import useSplittingHover from '../../hooks/useSplittingHover'
import useSplittingOnLoad from '../../hooks/useSplittingOnLoad'
import PopupBrif from '../../popupbrif/PopupBrif'
import './footerContacts.scss'

function FooterContacts() {
    const [brifOpened, setBrifOpened] = React.useState(false);
    const [visibleLines, setVisibleLines] = useState<number[]>([]);
    const isPageRefresh = usePageRefresh();
    const isPageRefreshing = usePageRefreshing();

    const handleOpenPopup = () => {
        setBrifOpened(true);
    };
    
    useSplittingOnLoad('.slide-vertical');
    useSplittingHover();

    useEffect(() => {
            // Не запускаем анимацию пока идет прелоадер
            if (isPageRefreshing) return;
    
            Splitting({ target: '.contactButtons' });
            
            const descriptions = document.querySelectorAll('.discription');
            descriptions.forEach(description => {
                description.outerHTML = `<span class="discription">${description.textContent}</span>`;
            });
    
            // Динамические задержки в зависимости от типа загрузки
            const initialDelay = isPageRefresh ? 500 : 200;
            setTimeout(() => {
                setVisibleLines([0, 1]);
            }, initialDelay);
        }, [isPageRefresh, isPageRefreshing]);

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
        <footer className='underFooterContacts'>
            <section className='underFooterBottomContacts'>
                <Link data-splitting className='underLinkFirst' to='mailto:starflowdesign@gmail.com' target="_blank" rel="noopener noreferrer">Рабочая почта<br />starflowdesign@gmail.com</Link>
                <ul className='showLink'>
                    <Link data-splitting className='ul_link' to='https://dprofile.ru/starflowdesign' target="_blank" rel="noopener noreferrer">DPROFILE</Link>
                    <Link data-splitting className='ul_link' to='https://www.instagram.com/igor.dubovtsev.ui/' target="_blank" rel="noopener noreferrer">INSTAGRAM</Link>
                    <Link data-splitting className='ul_link' to='https://t.me/StaflowDesign' target="_blank" rel="noopener noreferrer">TELEGRAM</Link>
                </ul>
                <Link data-splitting className='underLinkSecond' to='https://github.com/pavelO11' target="_blank" rel="noopener noreferrer">Верстка сайта<br />@pavelO11</Link>
            </section>
            <section className='lowerSection'>
                  {/* <article>
                        <Link data-splitting to='https://t.me/StarflowDesign' target='_blank' rel='noopener noreferrer' className='slide-vertical contactButtons'>
                            <p>СВЯЗАТЬСЯ<br></br>СО МНОЙ</p>
                            <span className='discription'>( телеграм )</span>
                            <img className='contactLight' alt='light' src='/burgerLight.svg' />
                        </Link>
                        <a data-splitting onClick={handleOpenPopup} className='slide-vertical contactButtons'>
                            <p>ЗАПОЛНИТЬ<br></br>БРИФ</p>
                            <span className='discription'>( небольшой )</span>
                            <img className='contactLight' alt='light' src='/burgerLight.svg' />
                        </a>
                  </article> */}
                <article>
                    <Link
                        data-splitting
                        to='https://t.me/StarflowDesign'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='contactButtons'
                    >
                        <p className={visibleLines.includes(0) ? 'visible' : ''} >
                            <span className='char'>СВЯЗАТЬСЯ</span>
                            <span className='char'>СО МНОЙ</span>
                            <span className='discription'>( телеграм )</span>
                        </p>
				    </Link>
                    <a
                        data-splitting
                        onClick={handleOpenPopup}
                        className='contactButtons'
                    >
					<p className={visibleLines.includes(0) ? 'visible' : ''} >
						<span className='char'>ЗАПОЛНИТЬ</span>
						<span className='char'>БРИФ</span>
						<span className='discription'>( небольшой )</span>
					</p>
				</a>
                </article>
                    <ul className='ulPortfolio'>
                        <Link data-splitting className='ul_link' to='https://dprofile.ru/starflowdesign' target="_blank" rel="noopener noreferrer">DPROFILE</Link>
                        <Link data-splitting className='ul_link' to='https://www.instagram.com/igor.dubovtsev.ui/' target="_blank" rel="noopener noreferrer">INSTAGRAM</Link>
                        <Link data-splitting className='ul_link' to='https://t.me/StaflowDesign' target="_blank" rel="noopener noreferrer">TELEGRAM</Link>
                    </ul>
                    <footer>
                        <Link
                        className='footerLinkFirst' 
                        to='mailto:starflowdesign@gmail.com' 
                        target="_blank" 
                        rel="noopener noreferrer">
                            Рабочая почта<br />starflowdesign@gmail.com
                        </Link>
                        <Link 
                        className='footerLinkSecond'
                        to='https://github.com/pavelO11' 
                        target="_blank" 
                        rel="noopener noreferrer">
                            Верстка сайта<br />pavelO11
                        </Link>
                    </footer>
            </section>
        </footer>
        </>
	);
}

export default FooterContacts;