function S45ROUND(state) {
	    var n = state.stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'S45ROUND[]', n); }

	    state.round = roundSuper;

	    var period;

	    switch (n & 0xC0) {
	        case 0x00:
	            period = Math.sqrt(2) / 2;
	            break;
	        case 0x40:
	            period = Math.sqrt(2);
	            break;
	        case 0x80:
	            period = 2 * Math.sqrt(2);
	            break;
	        default:
	            throw new Error('invalid S45ROUND value');
	    }

	    state.srPeriod = period;

	    switch (n & 0x30) {
	        case 0x00:
	            state.srPhase = 0;
	            break;
	        case 0x10:
	            state.srPhase = 0.25 * period;
	            break;
	        case 0x20:
	            state.srPhase = 0.5  * period;
	            break;
	        case 0x30:
	            state.srPhase = 0.75 * period;
	            break;
	        default:
	            throw new Error('invalid S45ROUND value');
	    }

	    n &= 0x0F;

	    if (n === 0) { state.srThreshold = 0; }
	    else { state.srThreshold = (n / 8 - 0.5) * period; }
	}