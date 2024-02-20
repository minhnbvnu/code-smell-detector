function SZP2(state) {
	    var n = state.stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'SZP2[]', n); }

	    state.zp2 = n;

	    switch (n) {
	        case 0:
	            if (!state.tZone) { initTZone(state); }
	            state.z2 = state.tZone;
	            break;
	        case 1 :
	            state.z2 = state.gZone;
	            break;
	        default :
	            throw new Error('Invalid zone pointer');
	    }
	}