function EVEN(state) {
	    var stack = state.stack;
	    var n = stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'EVEN[]', n); }

	    stack.push(Math.trunc(n) % 2 ? 0 : 1);
	}