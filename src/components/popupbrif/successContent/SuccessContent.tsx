import { motion } from 'framer-motion'
import { forwardRef } from 'react'
import { popupAnimation } from '../../animations/modals'
import useSplittingHover from '../../hooks/useSplittingHover'
import './successcontent.scss'
import arrowLeft from '/arrowBlackL.svg'
import arrowRight from '/arrowBlackR.svg'

interface SuccessContentProps {
    handleDrawerClose: () => void;
}

const SuccessContent = forwardRef<HTMLElement, SuccessContentProps>(({ handleDrawerClose }, ref) => {

    useSplittingHover();

	return (
      <motion.article
        variants={popupAnimation}
        exit='exit'
        className='drawerSecond' 
        ref={ref}>
            <header>
                <p className='popupTextSecond'>Вместе мы сделаем что-то<br />по истине крутое</p>
            </header>
            <main>
                <h4 className='successMessage'>Спасибо! Ваша заявка<br />получена!</h4>
            </main>
            <footer>
                <p className='footerFormText'>Я изучу бриф и свяжусь с Вами<br />в ближайшее время</p>
                <button data-splitting onClick={handleDrawerClose} className='closeButtonSuccess'><img className='leftArrow' src={arrowLeft} alt='arrow' />Закрыть<img className='rightArrow' src={arrowRight} alt='arrow' /></button>
            </footer>
        </motion.article>
	);
})

export default SuccessContent;
