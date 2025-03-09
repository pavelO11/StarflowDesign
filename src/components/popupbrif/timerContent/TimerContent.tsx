// import { motion } from 'framer-motion'
// import React from 'react'
// import { popupAnimation } from '../../animations/modals'
// import useSplittingHover from '../../hooks/useSplittingHover'
// import './timercontent.scss'
// import arrowLeft from '/arrowBlackL.svg'
// import arrowRight from '/arrowBlackR.svg'

// interface TimerContentProps {
//     ref: React.RefObject<HTMLElement>;
//     handleDrawerClose: () => void;
//     remainingTime: number;
// }

// const TimerContent: React.FC<TimerContentProps> = ({ ref, handleDrawerClose, remainingTime }) => {
//     const formatTime = (ms: number) => {
//         const minutes = Math.floor(ms / 60000);
//         const seconds = Math.floor((ms % 60000) / 1000);
//         return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//     };

//     useSplittingHover();

//     return (
//         <motion.article
//         variants={popupAnimation}
//         exit='exit'
//         initial='initial'
//         className='drawerThird' 
//         ref={ref}>
//             <header>
//                 <p className='popupTextThird'>Пожалуйста, подождите,<br />пока закончится таймер</p>
//             </header>
//             <main>
//                 <p className='timer'>{formatTime(remainingTime)}</p>
//             </main>
//             <footer>
//                 <p className='footerFormText'>После завершения отсчета, Вы<br />снова сможете заполнить бриф</p>
//                 <button data-splitting onClick={handleDrawerClose} className='closeButtonTimer'>
//                     <img className='leftArrow' src={arrowLeft} alt='arrow' />Закрыть<img className='rightArrow' src={arrowRight} alt='arrow' />
//                 </button>
//             </footer>
//         </motion.article>
//     );
// };

// export default TimerContent;

import { motion } from 'framer-motion'
import React from 'react'
import { popupAnimation } from '../../animations/modals'
import useSplittingHover from '../../hooks/useSplittingHover'
import './timercontent.scss'
import arrowLeft from '/arrowBlackL.svg'
import arrowRight from '/arrowBlackR.svg'

interface TimerContentProps {
    ref?: React.Ref<HTMLElement>;
    handleDrawerClose: () => void;
    remainingTime: number;
}

const TimerContent = React.forwardRef<HTMLElement, Omit<TimerContentProps, 'ref'>>(({ handleDrawerClose, remainingTime }, ref) => {
    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    useSplittingHover();

    return (
        <motion.article
        variants={popupAnimation}
        exit='exit'
        initial='initial'
        className='drawerThird' 
        ref={ref}>
            <header>
                <p className='popupTextThird'>Пожалуйста, подождите,<br />пока закончится таймер</p>
            </header>
            <main>
                <p className='timer'>{formatTime(remainingTime)}</p>
            </main>
            <footer>
                <p className='footerFormText'>После завершения отсчета, Вы<br />снова сможете заполнить бриф</p>
                <button data-splitting onClick={handleDrawerClose} className='closeButtonTimer'>
                    <img className='leftArrow' src={arrowLeft} alt='arrow' />Закрыть<img className='rightArrow' src={arrowRight} alt='arrow' />
                </button>
            </footer>
        </motion.article>
    );
});

export default TimerContent;