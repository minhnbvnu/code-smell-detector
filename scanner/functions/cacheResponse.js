async function cacheResponse(cacheVer, request, originalResponse, event) {
	let status = '';
	const accept = request.headers.get('Accept');
	if (
		request.method === 'GET' &&
		originalResponse.status === 200 &&
		accept &&
		accept.indexOf('text/html') >= 0
	) {
		cacheVer = await GetCurrentCacheVersion(cacheVer);
		const cacheKeyRequest = GenerateCacheRequest(request, cacheVer);

		try {
			// Move the cache headers out of the way so the response can actually be cached.
			// First clone the response so there is a parallel body stream and then
			// create a new response object based on the clone that we can edit.
			let cache = caches.default;
			let clonedResponse = originalResponse.clone();
			let response = new Response(clonedResponse.body, clonedResponse);
			for (header of CACHE_HEADERS) {
				let value = response.headers.get(header);
				if (value) {
					response.headers.delete(header);
					response.headers.set('x-HTML-Edge-Cache-Header-' + header, value);
				}
			}
			response.headers.delete('Set-Cookie');
			response.headers.set('Cache-Control', 'public; max-age=315360000');
			event.waitUntil(cache.put(cacheKeyRequest, response));
			status = ', Cached';
		} catch (err) {
			// status = ", Cache Write Exception: " + err.message;
		}
	}
	return status;
}