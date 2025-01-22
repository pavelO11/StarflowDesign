import { Link } from 'react-router-dom'
import useSplittingHover from '../../hooks/useSplittingHover'
import './footer404.scss'

function Footer404() {

    useSplittingHover();

	return (
	<>
    <footer className='underFooter404'>
        <section className='underFooterBottom404'>
            <Link data-splitting className='underLinkFirst' to='mailto:starflowdesign@gmail.com' target="_blank" rel="noopener noreferrer">Рабочая почта<br />starflowdesign@gmail.com</Link>
                <ul className='showLink'>
                    <Link data-splitting className='ul_link' to='https://dprofile.ru/starflowdesign' target="_blank" rel="noopener noreferrer">DPROFILE</Link>
                    <Link data-splitting className='ul_link' to='https://www.instagram.com/igor.dubovtsev.ui/' target="_blank" rel="noopener noreferrer">INSTAGRAM</Link>
                    <Link data-splitting className='ul_link' to='https://dribbble.com/StarflowDesign' target="_blank" rel="noopener noreferrer">DRIBBBLE</Link>
                </ul>
            <Link data-splitting className='underLinkSecond' to='https://github.com/pavelO11' target="_blank" rel="noopener noreferrer">Верстка сайта<br />@pavelO11</Link>
        </section>
        <section className='lowerSection'>
            <ul className='ulPortfolio'>
                <Link data-splitting className='ul_link' to='https://dprofile.ru/starflowdesign' target="_blank" rel="noopener noreferrer">DPROFILE</Link>
                <Link data-splitting className='ul_link' to='https://www.instagram.com/igor.dubovtsev.ui/' target="_blank" rel="noopener noreferrer">INSTAGRAM</Link>
                <Link data-splitting className='ul_link' to='https://dribbble.com/StarflowDesign' target="_blank" rel="noopener noreferrer">DRIBBBLE</Link>
            </ul>
            <footer>
                <Link className='footerLinkFirst' to='mailto:starflowdesign@gmail.com' target="_blank" rel="noopener noreferrer">Рабочая почта<br />starflowdesign@gmail.com</Link>
                <Link className='footerLinkSecond' to='https://github.com/pavelO11' target="_blank" rel="noopener noreferrer">Верстка сайта<br />@pavelO11</Link>
            </footer>
        </section>
    </footer>
    </>
	);
}

export default Footer404;