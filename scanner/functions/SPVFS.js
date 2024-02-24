function SPVFS(state) {
	    var stack = state.stack;
	    var y = stack.pop();
	    var x = stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'SPVFS[]', y, x); }

	    state.pv = state.dpv = getUnitVector(x, y);
	}