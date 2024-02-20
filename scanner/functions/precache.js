function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(filesToCache);
  });
}