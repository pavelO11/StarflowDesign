import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Splitting from 'splitting'
import useSplittingHover from '../../components/hooks/useSplittingHover.tsx'
import useSplittingOnLoad from '../../components/hooks/useSplittingOnLoad.tsx'
import Curve from '../../components/layoutTransition/index.tsx'
import NavigationButtons from '../../components/navigation/Navigation.tsx'
import PopupBrif from '../../components/popupbrif/PopupBrif.tsx'
import './contacts.scss'

function Contacts() {
	const [brifOpened, setBrifOpened] = useState(false);
	const [visibleLines, setVisibleLines] = useState<number[]>([]);
	
	const handleOpenPopup = () => {
		setBrifOpened(true);
	};

	useSplittingOnLoad('.slide-vertical');
	useSplittingHover();

	useEffect(() => {
    Splitting({ target: '.contactButtons' });
    
    const descriptions = document.querySelectorAll('.discription');
    descriptions.forEach(description => {
    	description.outerHTML = `<span class="discription">${description.textContent}</span>`;
    });

    const initialDelay = 3800; // delay
    setTimeout(() => {
    	setVisibleLines([0, 1]);
    }, initialDelay);
  }, []);
	
	return (
		<Curve>
			<Helmet>
          		<title>Starflow Design - Контакты</title>
          		<meta name="description" content="Хотите заказать дизайн сайта с упором на эстетику, удобство и смыслы, который соответствует вашим бизнес-целям - свяжитесь со мной." />
            </Helmet>
		  <section className='contactSection'>
			<AnimatePresence mode='wait'>
				{brifOpened && <PopupBrif onClose={() => setBrifOpened(false)} selectedService={null} />}
			</AnimatePresence>
			<h1 data-splitting className='slide-vertical w-full'>
				<span className='firText'>Давайте</span>
				<span className='secText'> Сотрудничать</span>
			</h1>
            <div className="slide-vertical sm">
				<h1 data-splitting className='slide-vertical sm'>
					<span className='firText'>Давайте</span>
				</h1>
				<h1 data-splitting className='slide-vertical'>
					<span className='secText'>Сотрудничать</span>
				</h1>
            </div>
			<NavigationButtons />
			<article className='contactText'>
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
		  </section>
		</Curve>
	  );	
}

export default Contacts;
