function FLIPON(state) {
	    if (exports.DEBUG) { console.log(state.step, 'FLIPON[]'); }
	    state.autoFlip = true;
	}