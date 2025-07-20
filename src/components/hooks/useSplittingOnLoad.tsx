// import { useEffect } from 'react'
// import Splitting from 'splitting'

// const useSplittingAnimation = (className: string, delay: number = 3600) => { // delay in ms
//     useEffect(() => {
//         // Initialize Splitting.js for text animation
//         Splitting();

//         // Apply the animation class after a short delay
//         const timeoutId = setTimeout(() => {
//             const elements = document.querySelectorAll(className);
//             elements.forEach((element) => {
//                 element.classList.add('animate-on-load');
//             });
//         }, delay);

//         return () => {
//             clearTimeout(timeoutId); // Clear the timeout if the component unmounts
//         };
//     }, [className, delay]);
// };

// export default useSplittingAnimation;

import { useEffect } from 'react'
import Splitting from 'splitting'
import { usePageRefresh } from '../context/PageRefrashContext'

const useSplittingOnLoad = (className: string, delay?: number) => {
    const isPageRefresh = usePageRefresh();
    useEffect(() => {
        Splitting();
        const timeoutId = setTimeout(() => {
            const elements = document.querySelectorAll(className);
            elements.forEach((element) => {
                element.classList.add('animate-on-load');
            });
        }, delay ?? (isPageRefresh ? 6000 : 150)); // например, 3600 при перезагрузке, 1000 при переходе

        return () => clearTimeout(timeoutId);
    }, [className, delay, isPageRefresh]);
};

export default useSplittingOnLoad;