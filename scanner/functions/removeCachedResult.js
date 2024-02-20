function removeCachedResult(removedLru) {
	var removedLruLen = removedLru.length,
		currentLru = removedLru[removedLruLen - 1],
		tmp,
		i;

	currentLru.cacheItem.delete(currentLru.arg);

	// walk down the tree removing dead branches (size 0) along the way
	for (i = removedLruLen - 2; i >= 0; i--) {
		currentLru = removedLru[i];
		tmp = currentLru.cacheItem.get(currentLru.arg);

		if (!tmp || !tmp.size) {
			currentLru.cacheItem.delete(currentLru.arg);
		} else {
			break;
		}
	}
}