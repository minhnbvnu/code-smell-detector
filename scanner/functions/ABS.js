function ABS(state) {
	    var stack = state.stack;
	    var n = stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'ABS[]', n); }

	    stack.push(Math.abs(n));
	}