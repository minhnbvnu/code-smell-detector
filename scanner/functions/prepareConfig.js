function prepareConfig (config) {
	        var input = config._i,
	            format = config._f;

	        config._locale = config._locale || getLocale(config._l);

	        if (input === null || (format === undefined && input === '')) {
	            return createInvalid({nullInput: true});
	        }

	        if (typeof input === 'string') {
	            config._i = input = config._locale.preparse(input);
	        }

	        if (isMoment(input)) {
	            return new Moment(checkOverflow(input));
	        } else if (isDate(input)) {
	            config._d = input;
	        } else if (isArray(format)) {
	            configFromStringAndArray(config);
	        } else if (format) {
	            configFromStringAndFormat(config);
	        }  else {
	            configFromInput(config);
	        }

	        if (!isValid(config)) {
	            config._d = null;
	        }

	        return config;
	    }