function SDS(state) {
	    var stack = state.stack;
	    var n = stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'SDS[]', n); }

	    state.deltaShift = Math.pow(0.5, n);
	}