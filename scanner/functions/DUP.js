function DUP(state) {
	    var stack = state.stack;

	    if (exports.DEBUG) { console.log(state.step, 'DUP[]'); }

	    stack.push(stack[stack.length - 1]);
	}