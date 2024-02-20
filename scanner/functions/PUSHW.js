function PUSHW(n, state) {
	    var ip = state.ip;
	    var prog = state.prog;
	    var stack = state.stack;

	    if (exports.DEBUG) { console.log(state.ip, 'PUSHW[' + n + ']'); }

	    for (var i = 0; i < n; i++) {
	        var w = (prog[++ip] << 8) | prog[++ip];
	        if (w & 0x8000) { w = -((w ^ 0xffff) + 1); }
	        stack.push(w);
	    }

	    state.ip = ip;
	}