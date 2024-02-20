function SMD(state) {
	    var d = state.stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'SMD[]', d); }

	    state.minDis = d / 0x40;
	}