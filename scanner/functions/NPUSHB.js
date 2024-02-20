function NPUSHB(state) {
	    var prog = state.prog;
	    var ip = state.ip;
	    var stack = state.stack;

	    var n = prog[++ip];

	    if (exports.DEBUG) { console.log(state.step, 'NPUSHB[]', n); }

	    for (var i = 0; i < n; i++) { stack.push(prog[++ip]); }

	    state.ip = ip;
	}