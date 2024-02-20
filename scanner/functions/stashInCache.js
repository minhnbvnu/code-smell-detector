function stashInCache(cacheName, request, response) {
    caches.open(cacheName).then(cache => cache.put(request, response));
  }