function MIAP(round, state) {
	    var stack = state.stack;
	    var n = stack.pop();
	    var pi = stack.pop();
	    var p = state.z0[pi];
	    var fv = state.fv;
	    var pv = state.pv;
	    var cv = state.cvt[n];

	    if (exports.DEBUG) {
	        console.log(
	            state.step,
	            'MIAP[' + round + ']',
	            n, '(', cv, ')', pi
	        );
	    }

	    var d = pv.distance(p, HPZero);

	    if (round) {
	        if (Math.abs(d - cv) < state.cvCutIn) { d = cv; }

	        d = state.round(d);
	    }

	    fv.setRelative(p, HPZero, d, pv);

	    if (state.zp0 === 0) {
	        p.xo = p.x;
	        p.yo = p.y;
	    }

	    fv.touch(p);

	    state.rp0 = state.rp1 = pi;
	}