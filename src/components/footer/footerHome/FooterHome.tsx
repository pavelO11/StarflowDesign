import { Link } from 'react-router-dom'
import './footerHome.scss'
import arrowLeft from '/arrowLeft.svg'
import arrowRight from '/arrowRight.svg'

import { useEffect, useState } from 'react'
import Splitting from 'splitting'
import { usePageRefresh, usePageRefreshing } from '../../context/PageRefreshContext'
import useSplittingHover from '../../hooks/useSplittingHover'
import useSplittingOnLoad from '../../hooks/useSplittingOnLoad'


function FooterHome() {
    const [visibleLines, setVisibleLines] = useState<number[]>([]);
    const isPageRefresh = usePageRefresh();
    const isPageRefreshing = usePageRefreshing();

    useSplittingOnLoad('.slide-vertical');

    useEffect(() => {
            // Не запускаем анимацию текста пока идет прелоадер
            if (isPageRefreshing) return;
    
            Splitting({ target: '.homeText p' });
            
            // Динамические задержки в зависимости от типа загрузки
            const initialDelay = isPageRefresh ? 500 : 200; // Уменьшенные задержки после прелоадера
            const subsequentDelay = 100; // delay beetween strings
    
            const lines = document.querySelectorAll('.homeText p');
            lines.forEach((_line, index) => {
                const delay = initialDelay + subsequentDelay * index;
                setTimeout(() => {
                    setVisibleLines(prev => [...prev, index]);
                }, delay);
            });
        }, [isPageRefresh, isPageRefreshing]);

    useSplittingHover();

    return (
        <footer className='underFooter'>
            <section className='underFooterBottom'>
                <p className='underLinkFirst'>
                    В проект вложена<br />частичка моей души
                </p>
                <article className='homeText'>
					<section>
						<p className={visibleLines.includes(0) ? 'visible' : ''} data-splitting>
							<span className='char'>Эмпатичный дизайнер, стремлюсь</span>
						</p>
						<p className={visibleLines.includes(1) ? 'visible' : ''} data-splitting>
							<span className='char'>сделать ваш бренд понятным</span>
						</p>
						<p className={visibleLines.includes(2) ? 'visible' : ''} data-splitting>
							<span className='char'>и выделяющимся</span>
						</p>
					</section>

					<section>
						<p className={visibleLines.includes(0) ? 'visible' : ''} data-splitting>
							<span className='char'>Моя цель — создание эффектных</span>
						</p>
						<p className={visibleLines.includes(1) ? 'visible' : ''} data-splitting>
							<span className='char'>и эффективных решений</span>
						</p>
						<p className={visibleLines.includes(2) ? 'visible' : ''} data-splitting>
							<span className='char'>для вашего бизнеса</span>
						</p>
					</section>
                </article>
                <Link to='https://t.me/StarflowDesign' className='contactMeMain'>
                    <section className='mainFooterP'>
                        <img className='leftArrow' src={arrowLeft} alt='arrow' />
                        написать в телеграм
                        <img className='rightArrow' src={arrowRight} alt='arrow' />
                    </section>
                </Link>
                <ul className='showLink'>
                    <Link data-splitting className='ul_link' to='https://dprofile.ru/starflowdesign' target="_blank" rel="noopener noreferrer">DPROFILE</Link>
                    <Link data-splitting className='ul_link' to='https://www.instagram.com/igor.dubovtsev.ui/' target="_blank" rel="noopener noreferrer">INSTAGRAM</Link>
                    <Link data-splitting className='ul_link' to='https://t.me/StaflowDesign' target="_blank" rel="noopener noreferrer">TELEGRAM</Link>
                </ul>
                <Link 
                    data-splitting
                    className="underLinkSecond"
                    to='https://github.com/pavelO11' 
                    target="_blank" 
                    rel="noopener noreferrer"
                    >
                    Верстка сайта<br />@pavelO11
                </Link>
            </section>
        </footer>
    );
}

export default FooterHome;