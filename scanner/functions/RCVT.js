function RCVT(state) {
	    var stack = state.stack;
	    var cvte = stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'RCVT', cvte); }

	    stack.push(state.cvt[cvte] * 0x40);
	}