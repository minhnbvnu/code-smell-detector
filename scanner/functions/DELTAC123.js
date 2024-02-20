function DELTAC123(b, state) {
	    var stack = state.stack;
	    var n = stack.pop();
	    var ppem = state.ppem;
	    var base = state.deltaBase + (b - 1) * 16;
	    var ds = state.deltaShift;

	    if (exports.DEBUG) { console.log(state.step, 'DELTAC[' + b + ']', n, stack); }

	    for (var i = 0; i < n; i++) {
	        var c = stack.pop();
	        var arg = stack.pop();
	        var appem = base + ((arg & 0xF0) >> 4);
	        if (appem !== ppem) { continue; }

	        var mag = (arg & 0x0F) - 8;
	        if (mag >= 0) { mag++; }

	        var delta = mag * ds;

	        if (exports.DEBUG) { console.log(state.step, 'DELTACFIX', c, 'by', delta); }

	        state.cvt[c] += delta;
	    }
	}