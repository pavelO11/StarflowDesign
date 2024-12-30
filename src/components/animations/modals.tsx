export const popupAnimation = {
	initial: {
		x: '100%'
	},
	enter: {
		x: '0%',
		transition: {
			duration: .8,
			easyInOut: [.1,.1,.1,1]
		}
	},
	exit: {
		x: '100%',
		transition: {
			duration: .6,
			easyInOut: [1,.1,1,1]
		}
	}
}

export const burgerAnimation = {
	// initial: {
	// 	y: '-100%'
	// },
	// enter: {
	// 	y: '0%',
	// 	transition: {
	// 		duration: .6,
	// 		easyInOut: [0.63, 0, 0.36, 0.99]
	// 	}
	// },
	// exit: {
	// 	y: '-100%',
	// 	transition: {
	// 		duration: .6,
	// 		easyInOut: [0.63, 0, 0.36, 0.99]
	// 	}
	// }
	initial: {
		x: '100%',
	  },
	  enter: {
		x: '0%',
		transition: {
		  duration: 0.8,
		//   ease: [0.1, 0.5, 0.4, 0.4], // Стандартная ease-in-out кривая
		easeInOut: [.57,.21,.69,1.25]
		// transition: {
		// 	duration: 0.4,
		// 	translate3d: [0, 0, 0]
		// }
		},
	},
	  exit: {
		x: '100%', // Возврат в исходное положение
		transition: {
		  duration: 0.8,
		  easeInOut: [.57,.21,.69,1.25]
		},
		// transition: {
		// 	duration: 0.,
		// 	translate3d: [100, 0, 0]
		// }
	  }
}