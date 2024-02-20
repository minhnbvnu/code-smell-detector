function CEILING(state) {
	    var stack = state.stack;
	    var n = stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'CEILING[]', n); }

	    stack.push(Math.ceil(n / 0x40) * 0x40);
	}