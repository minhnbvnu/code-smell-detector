function NOT(state) {
	    var stack = state.stack;
	    var e = stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'NOT[]', e); }

	    stack.push(e ? 0 : 1);
	}