export const popupAnimation = {
    initial: {
        x: '100%', // Начальное положение (за пределами экрана справа)
    },
    enter: {
        x: '0%', // Конечное положение (полностью видимо)
        transition: {
            duration: 0.8, // Продолжительность анимации
            ease: [0.63, 0.05, 0.36, 1], // Кастомная easing-функция
        },
    },
    exit: {
        x: '100%', // Возвращение за пределы экрана справа
        transition: {
            duration: 0.6, // Продолжительность анимации
            ease: [0.63, 0.05, 0.36, 1], // Кастомная easing-функция
        },
    },
};

export const overlayAnimation = {
    initial: {
        opacity: 0,
    },
    enter: {
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.63, 0.05, 0.36, 1],
        },
    },
    exit: {
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: [0.63, 0.05, 0.36, 1],
        },
    },
};

export const burgerAnimation = {
	// // 		easyInOut: [0.63, 0.05, 0.36, 1]
	// initial: {
	// 	x: '100%',
	//   },
	//   enter: {
	// 	x: '0%',
	// 	transition: {
	// 	  duration: 0.5, //was 0.8
	// 	//   ease: [0.1, 0.5, 0.4, 0.4], // Стандартная ease-in-out кривая
	// 	easeInOut: [0.63, 0.05, 0.36, 1]
	// 	// transition: {
	// 	// 	duration: 0.4,
	// 	// 	translate3d: [0, 0, 0]
	// 	// }
	// 	},
	// },
	//   exit: {
	// 	x: '100%',
	// 	transition: {
	// 	  duration: 0.4,//was 0.8
	// 	  easeInOut: [0.63, 0.05, 0.36, 1]
	// 	},
	// 	// transition: {
	// 	// 	duration: 0.,
	// 	// 	translate3d: [100, 0, 0]
	// 	// }
	//   }
	initial: {
        x: '100%',
        opacity: 1,
    },
    enter: {
        x: '0%',
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.63, 0.05, 0.36, 1],
        },
    },
    exit: {
        x: '100%',
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.63, 0.05, 0.36, 1],
        },
    },
}