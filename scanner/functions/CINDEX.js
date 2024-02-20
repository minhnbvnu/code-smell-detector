function CINDEX(state) {
	    var stack = state.stack;
	    var k = stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'CINDEX[]', k); }

	    // In case of k == 1, it copies the last element after popping
	    // thus stack.length - k.
	    stack.push(stack[stack.length - k]);
	}