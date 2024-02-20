function CLEAR(state) {
	    if (exports.DEBUG) { console.log(state.step, 'CLEAR[]'); }

	    state.stack.length = 0;
	}