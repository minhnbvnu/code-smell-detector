function SRP0(state) {
	    state.rp0 = state.stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'SRP0[]', state.rp0); }
	}