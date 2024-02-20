function getSetRelativeTimeRounding (roundingFunction) {
	        if (roundingFunction === undefined) {
	            return round;
	        }
	        if (typeof(roundingFunction) === 'function') {
	            round = roundingFunction;
	            return true;
	        }
	        return false;
	    }