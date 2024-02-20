function MSIRP(a, state) {
	    var stack = state.stack;
	    var d = stack.pop() / 64;
	    var pi = stack.pop();
	    var p = state.z1[pi];
	    var rp0 = state.z0[state.rp0];
	    var fv = state.fv;
	    var pv = state.pv;

	    fv.setRelative(p, rp0, d, pv);
	    fv.touch(p);

	    if (exports.DEBUG) { console.log(state.step, 'MSIRP[' + a + ']', d, pi); }

	    state.rp1 = state.rp0;
	    state.rp2 = pi;
	    if (a) { state.rp0 = pi; }
	}