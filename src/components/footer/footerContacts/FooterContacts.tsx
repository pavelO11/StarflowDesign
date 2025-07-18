import React from 'react'
import { Link } from 'react-router-dom'
import useSplittingHover from '../../hooks/useSplittingHover'
import PopupBrif from '../../popupbrif/PopupBrif'
import './footerContacts.scss'

function FooterContacts() {
    const [brifOpened, setBrifOpened] = React.useState(false);

    const handleOpenPopup = () => {
        setBrifOpened(true);
    };
    
    useSplittingHover();

	return (
        <>
        {brifOpened && <PopupBrif opened={brifOpened} onClose={() => setBrifOpened(false)} selectedService={null} /> }
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
                  <article>
                        <Link to='https://t.me/StarflowDesign' target='_blank' rel='noopener noreferrer' className='contactButtons'>
                            <p>СВЯЗАТЬСЯ<br></br>СО МНОЙ</p>
                            <span className='discription'>( телеграм )</span>
                            <img className='contactLight' alt='light' src='/burgerLight.svg' />
                        </Link>
                        <a onClick={handleOpenPopup} className='contactButtons'>
                            <p>ЗАПОЛНИТЬ<br></br>БРИФ</p>
                            <span className='discription'>( небольшой )</span>
                            <img className='contactLight' alt='light' src='/burgerLight.svg' />
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