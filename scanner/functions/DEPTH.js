function DEPTH(state) {
	    var stack = state.stack;

	    if (exports.DEBUG) { console.log(state.step, 'DEPTH[]'); }

	    stack.push(stack.length);
	}