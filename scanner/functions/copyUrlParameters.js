function copyUrlParameters(mockHandler, origSettings) {
		//parameters aren't captured if the URL isn't a RegExp
		if (!(mockHandler.url instanceof RegExp)) {
			return;
		}
		//if no URL params were defined on the handler, don't attempt a capture
		if (!mockHandler.hasOwnProperty('urlParams')) {
			return;
		}
		var captures = mockHandler.url.exec(origSettings.url);
		//the whole RegExp match is always the first value in the capture results
		if (captures.length === 1) {
			return;
		}
		captures.shift();
		//use handler params as keys and capture resuts as values
		var i = 0,
		capturesLength = captures.length,
		paramsLength = mockHandler.urlParams.length,
		//in case the number of params specified is less than actual captures
		maxIterations = Math.min(capturesLength, paramsLength),
		paramValues = {};
		for (i; i < maxIterations; i++) {
			var key = mockHandler.urlParams[i];
			paramValues[key] = captures[i];
		}
		origSettings.urlParams = paramValues;
	}