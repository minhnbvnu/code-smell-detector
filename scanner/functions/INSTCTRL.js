function INSTCTRL(state) {
	    var s = state.stack.pop();
	    var v = state.stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'INSTCTRL[]', s, v); }

	    switch (s) {
	        case 1 : state.inhibitGridFit = !!v; return;
	        case 2 : state.ignoreCvt = !!v; return;
	        default: throw new Error('invalid INSTCTRL[] selector');
	    }
	}