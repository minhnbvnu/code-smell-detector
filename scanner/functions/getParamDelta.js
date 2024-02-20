function getParamDelta(defaultParams, params) {
	// Compares an array of params to an array of default params,
	// and returns a new array containing only the entries that differ,
	// or null if there is no difference.
	let delta = null;
	for (let i=0; i<params.length; i++) {
		if (defaultParams[i] === params[i]) { continue; }
		if (delta === null) { delta = []; }
		delta.push(params[i]);
	}
	return delta;
}