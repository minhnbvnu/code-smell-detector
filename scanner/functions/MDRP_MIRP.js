function MDRP_MIRP(indirect, setRp0, keepD, ro, dt, state) {
	    var stack = state.stack;
	    var cvte = indirect && stack.pop();
	    var pi = stack.pop();
	    var rp0i = state.rp0;
	    var rp = state.z0[rp0i];
	    var p = state.z1[pi];

	    var md = state.minDis;
	    var fv = state.fv;
	    var pv = state.dpv;
	    var od; // original distance
	    var d; // moving distance
	    var sign; // sign of distance
	    var cv;

	    d = od = pv.distance(p, rp, true, true);
	    sign = d >= 0 ? 1 : -1; // Math.sign would be 0 in case of 0

	    // TODO consider autoFlip
	    d = Math.abs(d);

	    if (indirect) {
	        cv = state.cvt[cvte];

	        if (ro && Math.abs(d - cv) < state.cvCutIn) { d = cv; }
	    }

	    if (keepD && d < md) { d = md; }

	    if (ro) { d = state.round(d); }

	    fv.setRelative(p, rp, sign * d, pv);
	    fv.touch(p);

	    if (exports.DEBUG) {
	        console.log(
	            state.step,
	            (indirect ? 'MIRP[' : 'MDRP[') +
	            (setRp0 ? 'M' : 'm') +
	            (keepD ? '>' : '_') +
	            (ro ? 'R' : '_') +
	            (dt === 0 ? 'Gr' : (dt === 1 ? 'Bl' : (dt === 2 ? 'Wh' : ''))) +
	            ']',
	            indirect ?
	                cvte + '(' + state.cvt[cvte] + ',' +  cv + ')' :
	                '',
	            pi,
	            '(d =', od, '->', sign * d, ')'
	        );
	    }

	    state.rp1 = state.rp0;
	    state.rp2 = pi;
	    if (setRp0) { state.rp0 = pi; }
	}