function SHPIX(state) {
	    var stack = state.stack;
	    var loop = state.loop;
	    var fv = state.fv;
	    var d = stack.pop() / 0x40;
	    var z2 = state.z2;

	    while (loop--) {
	        var pi = stack.pop();
	        var p = z2[pi];

	        if (exports.DEBUG) {
	            console.log(
	                state.step,
	                (state.loop > 1 ? 'loop ' + (state.loop - loop) + ': ' : '') +
	                'SHPIX[]', pi, d
	            );
	        }

	        fv.setRelative(p, p, d);
	        fv.touch(p);
	    }

	    state.loop = 1;
	}