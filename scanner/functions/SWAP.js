function SWAP(state) {
	    var stack = state.stack;

	    var a = stack.pop();
	    var b = stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'SWAP[]'); }

	    stack.push(a);
	    stack.push(b);
	}