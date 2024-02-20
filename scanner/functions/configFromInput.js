function configFromInput(config) {
	        var input = config._i;
	        if (isUndefined(input)) {
	            config._d = new Date(hooks.now());
	        } else if (isDate(input)) {
	            config._d = new Date(input.valueOf());
	        } else if (typeof input === 'string') {
	            configFromString(config);
	        } else if (isArray(input)) {
	            config._a = map(input.slice(0), function (obj) {
	                return parseInt(obj, 10);
	            });
	            configFromArray(config);
	        } else if (isObject(input)) {
	            configFromObject(config);
	        } else if (isNumber(input)) {
	            // from milliseconds
	            config._d = new Date(input);
	        } else {
	            hooks.createFromInputFallback(config);
	        }
	    }