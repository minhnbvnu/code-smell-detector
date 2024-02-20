function RTDG(state) {
	    if (exports.DEBUG) { console.log(state.step, 'RTDG[]'); }

	    state.round = roundToDoubleGrid;
	}