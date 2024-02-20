function JMPR(state) {
	    var o = state.stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'JMPR[]', o); }

	    // A jump by 1 would do nothing.
	    state.ip += o - 1;
	}