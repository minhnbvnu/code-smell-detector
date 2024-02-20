function SDB(state) {
	    var stack = state.stack;
	    var n = stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'SDB[]', n); }

	    state.deltaBase = n;
	}