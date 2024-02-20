function RTHG(state) {
	    if (exports.DEBUG) { console.log(state.step, 'RTHG[]'); }

	    state.round = roundToHalfGrid;
	}