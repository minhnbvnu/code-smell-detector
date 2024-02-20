function clearOldCaches() {
    return caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key.indexOf(version) !== 0)
          .map(key => caches.delete(key))
      );
    });
  }