function SRP1(state) {
	    state.rp1 = state.stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'SRP1[]', state.rp1); }
	}