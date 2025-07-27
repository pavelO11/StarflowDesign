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

// ворк при перезагрузке
// import { useEffect } from 'react'
// import Splitting from 'splitting'
// import { usePageRefresh } from '../context/PageRefreshContext'

// /**
//  * Хук для анимации текста с использованием Splitting.js
//  * - При перезагрузке страницы: задержка defaultSplash (3800ms)
//  * - При навигации между страницами: задержка defaultNav (200ms)
//  * @param className - CSS-селектор для элементов Splitting
//  * @param delay - опциональная пользовательская задержка (ms)
//  */
// const useSplittingOnLoad = (className: string, delay?: number) => {
//     const contextRefresh = usePageRefresh();
    
//     // Дополнительная проверка через Performance API на реальную перезагрузку
//     const navEntries = performance.getEntriesByType("navigation");
//     const isHardReload = navEntries && (navEntries[0] as PerformanceNavigationTiming).type === "reload";
//     const isPageRefresh = contextRefresh || isHardReload;

//     useEffect(() => {
//         const defaultSplash = 3800;
//         const defaultNav    = 200;
//         const actualDelay = isPageRefresh
//             ? (delay ?? defaultSplash)
//             : (delay ?? defaultNav);
//         Splitting();
//         const timeoutId = setTimeout(() => {
//             document.querySelectorAll(className).forEach((el) => {
//                 el.classList.add('animate-on-load');
//             });
//         }, actualDelay);
//         return () => clearTimeout(timeoutId);
//     }, [className, delay, isPageRefresh]);
// };

// export default useSplittingOnLoad;


//вроде збс
import { useEffect } from 'react'
import Splitting from 'splitting'
import { usePageRefresh } from '../context/PageRefreshContext'

/**
 * Хук для анимации текста с использованием Splitting.js
 * - При перезагрузке страницы: задержка defaultSplash (3800ms)
 * - При навигации между страницами: задержка defaultNav (200ms)
 * @param className - CSS-селектор для элементов Splitting
 * @param delay - опциональная пользовательская задержка (ms)
 */
const useSplittingOnLoad = (className: string, delay?: number) => {
    const isPageRefresh = usePageRefresh();

    useEffect(() => {
        const defaultSplash = 3800;
        const defaultNav = 200;
        const actualDelay = isPageRefresh
            ? (delay ?? defaultSplash)
            : (delay ?? defaultNav);
            
        Splitting();
        const timeoutId = setTimeout(() => {
            document.querySelectorAll(className).forEach((el) => {
                el.classList.add('animate-on-load');
            });
        }, actualDelay);
        return () => clearTimeout(timeoutId);
    }, [className, delay, isPageRefresh]);
};

export default useSplittingOnLoad;