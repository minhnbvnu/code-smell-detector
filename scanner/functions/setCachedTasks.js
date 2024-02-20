function setCachedTasks(keys) {
	try {
		retrieveCache().set(cacheKey(cwd), keys);
		retrieveCache().fsDump();
	} catch (e) {
		// should ignore rerun set cache errors
	}
}