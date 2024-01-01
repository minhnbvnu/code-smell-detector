function incrementCacheCount (cacheCount, hash) {
  cacheCount[hash] = cacheCount[hash] === undefined ? 1 : cacheCount[hash] + 1;
}