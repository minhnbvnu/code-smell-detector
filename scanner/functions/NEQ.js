function NEQ(state) {
	    var stack = state.stack;
	    var e2 = stack.pop();
	    var e1 = stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'NEQ[]', e2, e1); }

	    stack.push(e2 !== e1 ? 1 : 0);
	}