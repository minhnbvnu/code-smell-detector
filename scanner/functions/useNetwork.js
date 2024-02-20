function useNetwork(request, failureCallback) {
    let cachePolicy = request.url.includes("service-worker.js") ? "no-cache" : "default";
    return fetch(request, { cache: cachePolicy })
      .then(function (response) {
        //console.log("Using network for: " + request.url);
        let cacheCopy = response.clone();
        caches
          .open(version + 'pages')
          .then(function add(cache) {
            return cache.put(request, cacheCopy);
          });
        return response;
      }, function (rejected) {
        return failureCallback(event.request, failureResponse);
      }).catch(function (error) {
        return failureCallback(event.request, failureResponse);
      });
  }