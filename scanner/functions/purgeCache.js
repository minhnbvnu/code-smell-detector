async function purgeCache(cacheVer, event) {
	if (typeof EDGE_CACHE !== 'undefined') {
		// Purge the KV cache by bumping the version number
		cacheVer = await GetCurrentCacheVersion(cacheVer);
		cacheVer++;
		event.waitUntil(EDGE_CACHE.put('html_cache_version', cacheVer.toString()));
	} else {
		// Purge everything using the API
		const url =
			'https://api.cloudflare.com/client/v4/zones/' + CLOUDFLARE_API.zone + '/purge_cache';
		event.waitUntil(
			fetch(url, {
				method: 'POST',
				headers: {
					'X-Auth-Email': CLOUDFLARE_API.email,
					'X-Auth-Key': CLOUDFLARE_API.key,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ purge_everything: true }),
			})
		);
	}
}