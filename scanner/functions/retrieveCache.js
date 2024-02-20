function retrieveCache() {
	if (avoidCache) {
		return;
	}

	if (!cache) {
		cache = new Cache({
			cacheName:
				rerunCacheName || process.env.NTL_RERUN_CACHE_NAME || "ntl-rerun-cache",
			cwd: rerunCacheDir || process.env.NTL_RERUN_CACHE_DIR,
			max: parseInt(process.env.NTL_RERUN_CACHE_MAX, 10) || 10
		});
	}

	return cache;
}