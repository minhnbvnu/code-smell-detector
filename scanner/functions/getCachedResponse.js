async function getCachedResponse(request) {
	let response = null;
	let cacheVer = null;
	let bypassCache = false;
	let status = 'Miss';

	// Only check for HTML GET requests (saves on reading from KV unnecessarily)
	// and not when there are cache-control headers on the request (refresh)
	const accept = request.headers.get('Accept');
	const cacheControl = request.headers.get('Cache-Control');
	let noCache = false;
	if (cacheControl && cacheControl.indexOf('no-cache') !== -1) {
		noCache = true;
		status = 'Bypass for Reload';
	}
	if (!noCache && request.method === 'GET' && accept && accept.indexOf('text/html') >= 0) {
		// Build the versioned URL for checking the cache
		cacheVer = await GetCurrentCacheVersion(cacheVer);
		const cacheKeyRequest = GenerateCacheRequest(request, cacheVer);

		// See if there is a request match in the cache
		try {
			let cache = caches.default;
			let cachedResponse = await cache.match(cacheKeyRequest);
			if (cachedResponse) {
				// Copy Response object so that we can edit headers.
				cachedResponse = new Response(cachedResponse.body, cachedResponse);

				// Check to see if the response needs to be bypassed because of a cookie
				bypassCache = shouldBypassEdgeCache(request, cachedResponse);

				// Copy the original cache headers back and clean up any control headers
				if (bypassCache) {
					status = 'Bypass Cookie';
				} else {
					status = 'Hit';
					cachedResponse.headers.delete('Cache-Control');
					cachedResponse.headers.delete('x-HTML-Edge-Cache-Status');
					for (header of CACHE_HEADERS) {
						let value = cachedResponse.headers.get('x-HTML-Edge-Cache-Header-' + header);
						if (value) {
							cachedResponse.headers.delete('x-HTML-Edge-Cache-Header-' + header);
							cachedResponse.headers.set(header, value);
						}
					}
					response = cachedResponse;
				}
			} else {
				status = 'Miss';
			}
		} catch (err) {
			// Send the exception back in the response header for debugging
			status = 'Cache Read Exception: ' + err.message;
		}
	}

	return { response, cacheVer, status, bypassCache };
}