function MPPEM(state) {
	    if (exports.DEBUG) { console.log(state.step, 'MPPEM[]'); }
	    state.stack.push(state.ppem);
	}