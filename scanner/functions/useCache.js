function useCache(request, failureCallback) {
    return caches.match(request, { ignoreSearch: true })
    .then(function (cached) {
      if (cached && !request.url.includes("service-worker.js")) {
        //console.log("Using cache for: " + request.url);
        return cached;
      } else {
        return failureCallback(request, failureResponse);
      }
    });
  }