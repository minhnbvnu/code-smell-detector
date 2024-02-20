function GFV(state) {
	    var stack = state.stack;
	    var fv = state.fv;

	    if (exports.DEBUG) { console.log(state.step, 'GFV[]'); }

	    stack.push(fv.x * 0x4000);
	    stack.push(fv.y * 0x4000);
	}