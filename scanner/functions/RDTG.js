function RDTG(state) {
	    if (exports.DEBUG) { console.log(state.step, 'RDTG[]'); }

	    state.round = roundDownToGrid;
	}