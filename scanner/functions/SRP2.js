function SRP2(state) {
	    state.rp2 = state.stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'SRP2[]', state.rp2); }
	}