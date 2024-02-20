function LOOPCALL(state) {
	    var stack = state.stack;
	    var fn = stack.pop();
	    var c = stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'LOOPCALL[]', fn, c); }

	    // saves callers program
	    var cip = state.ip;
	    var cprog = state.prog;

	    state.prog = state.funcs[fn];

	    // executes the function
	    for (var i = 0; i < c; i++) {
	        exec(state);

	        if (exports.DEBUG) { console.log(
	            ++state.step,
	            i + 1 < c ? 'next loopcall' : 'done loopcall',
	            i
	        ); }
	    }

	    // restores the callers program
	    state.ip = cip;
	    state.prog = cprog;
	}