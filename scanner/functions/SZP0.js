function SZP0(state) {
	    var n = state.stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'SZP0[]', n); }

	    state.zp0 = n;

	    switch (n) {
	        case 0:
	            if (!state.tZone) { initTZone(state); }
	            state.z0 = state.tZone;
	            break;
	        case 1 :
	            state.z0 = state.gZone;
	            break;
	        default :
	            throw new Error('Invalid zone pointer');
	    }
	}