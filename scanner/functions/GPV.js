function GPV(state) {
	    var stack = state.stack;
	    var pv = state.pv;

	    if (exports.DEBUG) { console.log(state.step, 'GPV[]'); }

	    stack.push(pv.x * 0x4000);
	    stack.push(pv.y * 0x4000);
	}