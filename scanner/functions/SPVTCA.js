function SPVTCA(v, state) {
	    if (exports.DEBUG) { console.log(state.step, 'SPVTCA[' + v.axis + ']'); }

	    state.pv = state.dpv = v;
	}