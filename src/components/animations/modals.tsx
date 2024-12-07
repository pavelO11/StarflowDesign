export const popupAnimation = {
	initial: {
		x: '100%'
	},
	enter: {
		x: '0%',
		transition: {
			duration: 0.6,
			easyInOut: [0.63, 0, 0.36, 0.99]
		}
	},
	exit: {
		x: '100%',
		transition: {
			duration: 0.6,
			easyInOut: [0.63, 0, 0.36, 0.99]
		}
	}
}

// export const overlayAnimation = {
// 	initial: {
// 		opacity: '0'
// 	},
// 	enter: {
// 		opacity: '1',
// 		transition: {
// 			duration: 0.3
// 		}
// 	},
// 	exit: {
// 		opacity: '0',
// 		transition: {
// 			duration: 0.3
// 		}
// 	}
// }

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
		x: '100%'
	},
	enter: {
		x: '0%',
		transition: {
			duration: .6,
			easyInOut: [0.01, 1, 0.16, 0.01]
		}
	},
	exit: {
		x: '100%',
		transition: {
			duration: .6,
			easyInOut: [0.01, 1, 0.16, 0.01]
		}
	}
}