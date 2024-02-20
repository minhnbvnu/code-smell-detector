function prepopulated_cache_test(entries, test_function, description) {
      return cache_test(function (cache) {
        var p = Promise.resolve();
        var hash = {};
        entries.forEach(function (entry) {
          hash[entry.name] = entry;
          p = p.then(function () {
            return cache.put(entry.request.clone(), entry.response.clone())
              .catch(function (e) {
                assert_unreached(
                  'Test setup failed for entry ' + entry.name + ': ' + e
                );
              });
          });
        });
        return p
          .then(function () {
            assert_equals(Object.keys(hash).length, entries.length);
          })
          .then(function () {
            return test_function(cache, hash);
          });
      }, description);
    }