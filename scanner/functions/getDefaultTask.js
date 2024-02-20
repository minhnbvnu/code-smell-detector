function getDefaultTask() {
	try {
		return retrieveCache()
			.get(cacheKey(cwd))
			.join(sep);
	} catch (e) {
		return undefined;
	}
}