function FDEF(state) {
	    if (state.env !== 'fpgm') { throw new Error('FDEF not allowed here'); }
	    var stack = state.stack;
	    var prog = state.prog;
	    var ip = state.ip;

	    var fn = stack.pop();
	    var ipBegin = ip;

	    if (exports.DEBUG) { console.log(state.step, 'FDEF[]', fn); }

	    while (prog[++ip] !== 0x2D){ }

	    state.ip = ip;
	    state.funcs[fn] = prog.slice(ipBegin + 1, ip);
	}