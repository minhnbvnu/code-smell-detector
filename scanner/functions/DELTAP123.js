function DELTAP123(b, state) {
	    var stack = state.stack;
	    var n = stack.pop();
	    var fv = state.fv;
	    var pv = state.pv;
	    var ppem = state.ppem;
	    var base = state.deltaBase + (b - 1) * 16;
	    var ds = state.deltaShift;
	    var z0 = state.z0;

	    if (exports.DEBUG) { console.log(state.step, 'DELTAP[' + b + ']', n, stack); }

	    for (var i = 0; i < n; i++) {
	        var pi = stack.pop();
	        var arg = stack.pop();
	        var appem = base + ((arg & 0xF0) >> 4);
	        if (appem !== ppem) { continue; }

	        var mag = (arg & 0x0F) - 8;
	        if (mag >= 0) { mag++; }
	        if (exports.DEBUG) { console.log(state.step, 'DELTAPFIX', pi, 'by', mag * ds); }

	        var p = z0[pi];
	        fv.setRelative(p, p, mag * ds, pv);
	    }
	}