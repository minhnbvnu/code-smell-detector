async function GetCurrentCacheVersion(cacheVer) {
	if (cacheVer === null) {
		if (typeof EDGE_CACHE !== 'undefined') {
			cacheVer = await EDGE_CACHE.get('html_cache_version');
			if (cacheVer === null) {
				// Uninitialized - first time through, initialize KV with a value
				// Blocking but should only happen immediately after worker activation.
				cacheVer = 0;
				await EDGE_CACHE.put('html_cache_version', cacheVer.toString());
			} else {
				cacheVer = parseInt(cacheVer);
			}
		} else {
			cacheVer = -1;
		}
	}
	return cacheVer;
}