// import Lenis from 'lenis'
// import 'lenis/dist/lenis.css'

// const lenis = new Lenis({
//     duration: 1.3,
//     easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
//     orientation: "vertical", // vertical, horizontal
//     gestureOrientation: "vertical", // vertical, horizontal, both
//     smoothWheel: true,
//     wheelMultiplier: 1,
//     syncTouch: false,
//     touchMultiplier: 1,
//     infinite: false
// });

// // Удаляем кастомные методы stop/start
// // Вместо этого будем использовать встроенные методы напрямую
// function raf(time: number) {
//     lenis.raf(time);
//     requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);

// export default lenis;