function SLOOP(state) {
	    state.loop = state.stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'SLOOP[]', state.loop); }
	}