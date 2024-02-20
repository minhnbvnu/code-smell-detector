function get$1 (format, index, field, setter) {
	        var locale = getLocale();
	        var utc = createUTC().set(setter, index);
	        return locale[field](utc, format);
	    }