function ROLL(state) {
	    var stack = state.stack;
	    var a = stack.pop();
	    var b = stack.pop();
	    var c = stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'ROLL[]'); }

	    stack.push(b);
	    stack.push(a);
	    stack.push(c);
	}