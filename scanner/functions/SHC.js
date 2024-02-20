function SHC(a, state) {
	    var stack = state.stack;
	    var rpi = a ? state.rp1 : state.rp2;
	    var rp = (a ? state.z0 : state.z1)[rpi];
	    var fv = state.fv;
	    var pv = state.pv;
	    var ci = stack.pop();
	    var sp = state.z2[state.contours[ci]];
	    var p = sp;

	    if (exports.DEBUG) { console.log(state.step, 'SHC[' + a + ']', ci); }

	    var d = pv.distance(rp, rp, false, true);

	    do {
	        if (p !== rp) { fv.setRelative(p, p, d, pv); }
	        p = p.nextPointOnContour;
	    } while (p !== sp);
	}