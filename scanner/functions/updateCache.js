async function updateCache(originalRequest, cacheVer, event) {
	// Clone the request, add the edge-cache header and send it through.
	let request = new Request(originalRequest);
	request.headers.set('x-HTML-Edge-Cache', 'supports=cache|purgeall|bypass-cookies');
	response = await fetch(request);

	if (response) {
		status = ': Fetched';
		const options = getResponseOptions(response);
		if (options && options.purge) {
			await purgeCache(cacheVer, event);
		}
		let bypassCache = shouldBypassEdgeCache(request, response);
		if ((!options || options.cache) && !bypassCache) {
			await cacheResponse(cacheVer, originalRequest, response, event);
		}
	}
}