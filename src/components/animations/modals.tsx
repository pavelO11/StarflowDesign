export const popupAnimation = {
	initial: {
		x: '100%'
	},
	enter: {
		x: '0%',
		transition: {
			duration: .8,
			easyInOut: [0.63, 0.05, 0.36, 1]
		}
	},
	exit: {
		x: '100%',
		transition: {
			duration: .6,
			easyInOut: [0.63, 0.05, 0.36, 1]
		}
	}
	// initial: {
    //     x: '100%',
    //     scale: 1,
    //     rotateX: 0,
    //     rotateY: 0,
    //     rotateZ: 0,
    //     skew: 0,
    //     transformStyle: 'preserve-3d',
    // },
    // enter: {
    //     x: '0%',
    //     scale: 1,
    //     rotateX: 0,
    //     rotateY: 0,
    //     rotateZ: 0,
    //     skew: 0,
    //     transformStyle: 'preserve-3d',
    //     transition: {
    //         duration: 0.6,
    //     },
    // },
    // exit: {
    //     x: '100%',
    //     scale: 1,
    //     rotateX: 0,
    //     rotateY: 0,
    //     rotateZ: 0,
    //     skew: 0,
    //     transformStyle: 'preserve-3d',
    //     transition: {
    //         duration: 0.6,
    //     },
    // },
}

export const burgerAnimation = {
	// 		easyInOut: [0.63, 0.05, 0.36, 1]
	initial: {
		x: '100%',
	  },
	  enter: {
		x: '0%',
		transition: {
		  duration: 0.5, //was 0.8
		//   ease: [0.1, 0.5, 0.4, 0.4], // Стандартная ease-in-out кривая
		easeInOut: [0.63, 0.05, 0.36, 1]
		// transition: {
		// 	duration: 0.4,
		// 	translate3d: [0, 0, 0]
		// }
		},
	},
	  exit: {
		x: '100%',
		transition: {
		  duration: 0.4,//was 0.8
		  easeInOut: [0.63, 0.05, 0.36, 1]
		},
		// transition: {
		// 	duration: 0.,
		// 	translate3d: [100, 0, 0]
		// }
	  }
}