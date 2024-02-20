async function hashContent(originalUrl, url, request) {
	let proxyUrl = null;
	let hash = null;
	const userAgent = request.headers.get('user-agent');
	const clientAddr = request.headers.get('cf-connecting-ip');
	const hashCacheKey = new Request(url + 'cf-hash-key');
	let cache = null;

	let foundInCache = false;
	// Try pulling it from the cache API (wrap it in case it's not implemented)
	try {
		cache = caches.default;
		let response = await cache.match(hashCacheKey);
		if (response) {
			hash = await response.text();
			proxyUrl = constructProxyUrl(originalUrl, hash);
			foundInCache = true;
		}
	} catch (e) {
		// Ignore the exception
	}

	if (!foundInCache) {
		try {
			let headers = { 'Referer': request.url, 'User-Agent': userAgent };
			if (clientAddr) {
				headers['X-Forwarded-For'] = clientAddr;
			}
			const response = await fetch(url, { headers: headers });
			let content = await response.arrayBuffer();
			if (content) {
				const hashBuffer = await crypto.subtle.digest('SHA-1', content);
				hash = hex(hashBuffer);
				proxyUrl = constructProxyUrl(originalUrl, hash);

				// Add the hash to the local cache
				try {
					if (cache) {
						let ttl = 60;
						const cacheControl = response.headers.get('cache-control');
						const maxAgeRegex = /max-age\s*=\s*(\d+)/i;
						const match = maxAgeRegex.exec(cacheControl);
						if (match) {
							ttl = parseInt(match[1], 10);
						}
						const hashCacheResponse = new Response(hash, { ttl: ttl });
						cache.put(hashCacheKey, hashCacheResponse);
					}
				} catch (e) {
					// Ignore the exception
				}
			}
		} catch (e) {
			// Ignore the exception
		}
	}

	return proxyUrl;
}