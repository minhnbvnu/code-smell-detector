function SHP(a, state) {
	    var stack = state.stack;
	    var rpi = a ? state.rp1 : state.rp2;
	    var rp = (a ? state.z0 : state.z1)[rpi];
	    var fv = state.fv;
	    var pv = state.pv;
	    var loop = state.loop;
	    var z2 = state.z2;

	    while (loop--)
	    {
	        var pi = stack.pop();
	        var p = z2[pi];

	        var d = pv.distance(rp, rp, false, true);
	        fv.setRelative(p, p, d, pv);
	        fv.touch(p);

	        if (exports.DEBUG) {
	            console.log(
	                state.step,
	                (state.loop > 1 ?
	                   'loop ' + (state.loop - loop) + ': ' :
	                   ''
	                ) +
	                'SHP[' + (a ? 'rp1' : 'rp2') + ']', pi
	            );
	        }
	    }

	    state.loop = 1;
	}