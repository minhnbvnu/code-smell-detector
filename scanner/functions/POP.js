function POP(state) {
	    if (exports.DEBUG) { console.log(state.step, 'POP[]'); }

	    state.stack.pop();
	}