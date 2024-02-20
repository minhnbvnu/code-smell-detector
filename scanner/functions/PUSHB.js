function PUSHB(n, state) {
	    var stack = state.stack;
	    var prog = state.prog;
	    var ip = state.ip;

	    if (exports.DEBUG) { console.log(state.step, 'PUSHB[' + n + ']'); }

	    for (var i = 0; i < n; i++) { stack.push(prog[++ip]); }

	    state.ip = ip;
	}