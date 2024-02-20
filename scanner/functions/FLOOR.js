function FLOOR(state) {
	    var stack = state.stack;
	    var n = stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'FLOOR[]', n); }

	    stack.push(Math.floor(n / 0x40) * 0x40);
	}