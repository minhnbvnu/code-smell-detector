function GenerateCacheRequest(request, cacheVer) {
	let cacheUrl = request.url;
	if (cacheUrl.indexOf('?') >= 0) {
		cacheUrl += '&';
	} else {
		cacheUrl += '?';
	}
	cacheUrl += 'cf_edge_cache_ver=' + cacheVer;
	return new Request(cacheUrl);
}