function getNormalizedParams(params) {
	        if (params == null)
	            return null;
	        var key, normalizedParams = {};
	        for (key in params) {
	            if (key != null)
	                normalizedParams[key.toLowerCase()] = params[key];
	        }
	        return normalizedParams;
	    }