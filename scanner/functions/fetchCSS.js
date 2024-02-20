async function fetchCSS(url, request) {
	let fontCSS = '';
	if (url.startsWith('/')) url = 'https:' + url;
	const userAgent = request.headers.get('user-agent');
	const clientAddr = request.headers.get('cf-connecting-ip');
	const browser = getCacheKey(userAgent);
	const cacheKey = browser ? url + '&' + browser : url;
	const cacheKeyRequest = new Request(cacheKey);
	let cache = null;

	let foundInCache = false;
	if (cacheKey in FONT_CACHE) {
		// hit in the memory cache
		fontCSS = FONT_CACHE[cacheKey];
		foundInCache = true;
	} else {
		// Try pulling it from the cache API (wrap it in case it's not implemented)
		try {
			cache = caches.default;
			let response = await cache.match(cacheKeyRequest);
			if (response) {
				fontCSS = await response.text();
				foundInCache = true;
			}
		} catch (e) {
			// Ignore the exception
		}
	}

	if (!foundInCache) {
		let headers = { Referer: request.url };
		if (browser) {
			headers['User-Agent'] = userAgent;
		} else {
			headers['User-Agent'] = 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)';
		}
		if (clientAddr) {
			headers['X-Forwarded-For'] = clientAddr;
		}

		try {
			const response = await fetch(url, { headers: headers });
			if (response && response.status === 200) {
				fontCSS = await response.text();

				// Rewrite all of the font URLs to come through the worker
				fontCSS = fontCSS.replace(/(https?:)?\/\/fonts\.gstatic\.com\//gim, '/fonts.gstatic.com/');

				// Add the css info to the font caches
				FONT_CACHE[cacheKey] = fontCSS;
				try {
					if (cache) {
						const cacheResponse = new Response(fontCSS, { ttl: 86400 });
						event.waitUntil(cache.put(cacheKeyRequest, cacheResponse));
					}
				} catch (e) {
					// Ignore the exception
				}
			}
		} catch (e) {
			// Ignore the exception
		}
	}

	return fontCSS;
}