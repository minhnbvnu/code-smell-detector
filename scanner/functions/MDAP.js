function MDAP(round, state) {
	    var pi = state.stack.pop();
	    var p = state.z0[pi];
	    var fv = state.fv;
	    var pv = state.pv;

	    if (exports.DEBUG) { console.log(state.step, 'MDAP[' + round + ']', pi); }

	    var d = pv.distance(p, HPZero);

	    if (round) { d = state.round(d); }

	    fv.setRelative(p, HPZero, d, pv);
	    fv.touch(p);

	    state.rp0 = state.rp1 = pi;
	}