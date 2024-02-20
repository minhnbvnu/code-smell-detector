function SVTCA(v, state) {
	    if (exports.DEBUG) { console.log(state.step, 'SVTCA[' + v.axis + ']'); }

	    state.fv = state.pv = state.dpv = v;
	}