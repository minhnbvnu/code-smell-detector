function WCVTF(state) {
	    var stack = state.stack;
	    var v = stack.pop();
	    var l = stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'WCVTF[]', v, l); }

	    state.cvt[l] = v * state.ppem / state.font.unitsPerEm;
	}