function SZP1(state) {
	    var n = state.stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'SZP1[]', n); }

	    state.zp1 = n;

	    switch (n) {
	        case 0:
	            if (!state.tZone) { initTZone(state); }
	            state.z1 = state.tZone;
	            break;
	        case 1 :
	            state.z1 = state.gZone;
	            break;
	        default :
	            throw new Error('Invalid zone pointer');
	    }
	}