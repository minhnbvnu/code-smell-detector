function ROUND(dt, state) {
	    var stack = state.stack;
	    var n = stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'ROUND[]'); }

	    stack.push(state.round(n / 0x40) * 0x40);
	}