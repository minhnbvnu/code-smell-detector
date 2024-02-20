function NEG(state) {
	    var stack = state.stack;
	    var n = stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'NEG[]', n); }

	    stack.push(-n);
	}