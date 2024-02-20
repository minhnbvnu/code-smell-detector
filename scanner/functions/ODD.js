function ODD(state) {
	    var stack = state.stack;
	    var n = stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'ODD[]', n); }

	    stack.push(Math.trunc(n) % 2 ? 1 : 0);
	}