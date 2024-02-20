function ALIGNRP(state) {
	    var stack = state.stack;
	    var rp0i = state.rp0;
	    var rp0 = state.z0[rp0i];
	    var loop = state.loop;
	    var fv = state.fv;
	    var pv = state.pv;
	    var z1 = state.z1;

	    while (loop--) {
	        var pi = stack.pop();
	        var p = z1[pi];

	        if (exports.DEBUG) {
	            console.log(
	                state.step,
	                (state.loop > 1 ? 'loop ' + (state.loop - loop) + ': ' : '') +
	                'ALIGNRP[]', pi
	            );
	        }

	        fv.setRelative(p, rp0, 0, pv);
	        fv.touch(p);
	    }

	    state.loop = 1;
	}