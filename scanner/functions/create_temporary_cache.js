function create_temporary_cache() {
      var uniquifier = String(++next_cache_index);
      var cache_name = `temporary_cache/${uniquifier}`;

      return caches.delete(cache_name)
        .then(function () {
          return caches.open(cache_name);
        });
    }