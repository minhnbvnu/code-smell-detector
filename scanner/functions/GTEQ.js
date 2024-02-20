function GTEQ(state) {
	    var stack = state.stack;
	    var e2 = stack.pop();
	    var e1 = stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'GTEQ[]', e2, e1); }

	    stack.push(e1 >= e2 ? 1 : 0);
	}