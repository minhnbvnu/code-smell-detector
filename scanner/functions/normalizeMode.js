function normalizeMode(mode, def) {
	    switch (typeof mode) {
	        case 'number':
	            // (path, flag, mode, cb?)
	            return mode;
	        case 'string':
	            // (path, flag, modeString, cb?)
	            var trueMode = parseInt(mode, 8);
	            if (!isNaN(trueMode)) {
	                return trueMode;
	            }
	            // Invalid string.
	            return def;
	        default:
	            return def;
	    }
	}