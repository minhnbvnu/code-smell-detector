function updateStaticCache() {
    //try to fetch static top level pages - can be done after install.
    caches.open(staticCacheName).then(cache => {
      // These items must be cached for the Service Worker to complete installation
      return cache.addAll(
        offlinePages.map(
          url =>
            new Request(url, {
              credentials: 'include'
            })
        )
      );
    });

    return caches.open(staticCacheName).then(cache => {
      // These items must be cached for the Service Worker to complete installation
      return cache.addAll(
        staticAssets.map(
          url =>
            new Request(url, {
              credentials: 'include'
            })
        )
      );
    });
  }