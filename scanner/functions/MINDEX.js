function MINDEX(state) {
	    var stack = state.stack;
	    var k = stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'MINDEX[]', k); }

	    stack.push(stack.splice(stack.length - k, 1)[0]);
	}