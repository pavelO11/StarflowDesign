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


//вроде збс тут не ворк при перезагрузке а при переходе норм
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
//     const isPageRefresh = usePageRefresh();

//     useEffect(() => {
//         const defaultSplash = 3800;
//         const defaultNav = 200;
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

import { useEffect } from 'react'
import Splitting from 'splitting'
import { usePageRefresh, usePageRefreshing } from '../context/PageRefreshContext'

const useSplittingOnLoad = (className?: string, delay?: number) => {
    const isPageRefresh = usePageRefresh();
    const isPageRefreshing = usePageRefreshing();

    useEffect(() => {
        // Не запускаем Splitting пока идет прелоадер
        if (isPageRefreshing) {
            console.log('Splitting waiting for page refresh to complete...');
            return;
        }

        console.log('Splitting init started', { isPageRefresh, isPageRefreshing });

        const initSplitting = () => {
            const selector = className || '[data-splitting]';
            const elements = document.querySelectorAll(selector);
            
            console.log('Found elements for splitting:', elements.length);
            
            if (elements.length > 0) {
                try {
                    Splitting();
                    console.log('Splitting initialized successfully');
                    
                    // Применяем анимационный класс с задержкой
                    const defaultDelay = 10;
                    const actualDelay = delay ?? defaultDelay;

                    const timeoutId = setTimeout(() => {
                        elements.forEach((el) => {
                            el.classList.add('animate-on-load');
                        });
                        console.log('Added animate-on-load class to', elements.length, 'elements');
                    }, actualDelay);

                    return () => clearTimeout(timeoutId);
                } catch (error) {
                    console.warn('Splitting initialization failed:', error);
                }
            }
        };

        // Задержка для уверенности в отрисовке элементов
        const timer = setTimeout(() => {
            initSplitting();
        }, 10);

        return () => clearTimeout(timer);
    }, [className, delay, isPageRefresh, isPageRefreshing]);

    // MutationObserver для динамически добавляемых элементов
    useEffect(() => {
        if (isPageRefreshing) return;

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) {
                            const element = node as Element;
                            const selector = className || '[data-splitting]';
                            
                            if (element.matches?.(selector) || 
                                element.querySelector?.(selector)) {
                                setTimeout(() => {
                                    try {
                                        Splitting();
                                        console.log('Splitting reinitialized for new elements');
                                    } catch (error) {
                                        console.warn('Splitting reinitialization failed:', error);
                                    }
                                }, 50);
                            }
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        return () => observer.disconnect();
    }, [className, isPageRefreshing]);
};

export default useSplittingOnLoad;