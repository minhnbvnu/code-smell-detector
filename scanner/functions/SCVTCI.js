function SCVTCI(state) {
	    var n = state.stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'SCVTCI[]', n); }

	    state.cvCutIn = n / 0x40;
	}