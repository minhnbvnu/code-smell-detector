function WCVTP(state) {
	    var stack = state.stack;

	    var v = stack.pop();
	    var l = stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'WCVTP', v, l); }

	    state.cvt[l] = v / 0x40;
	}