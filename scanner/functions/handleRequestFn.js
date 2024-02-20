function handleRequestFn(tpl, ignoreRequestError) {
      handleRequestFn.totalPendingRequests++;

      // We consider the template cache holds only trusted templates, so
      // there's no need to go through whitelisting again for keys that already
      // are included in there. This also makes Angular accept any script
      // directive, no matter its name. However, we still need to unwrap trusted
      // types.
      if (!isString(tpl) || !$templateCache.get(tpl)) {
        tpl = $sce.getTrustedResourceUrl(tpl);
      }

      var transformResponse = $http.defaults && $http.defaults.transformResponse;

      if (isArray(transformResponse)) {
        transformResponse = transformResponse.filter(function(transformer) {
          return transformer !== defaultHttpResponseTransform;
        });
      } else if (transformResponse === defaultHttpResponseTransform) {
        transformResponse = null;
      }

      return $http.get(tpl, extend({
          cache: $templateCache,
          transformResponse: transformResponse
        }, httpOptions))
        ['finally'](function() {
          handleRequestFn.totalPendingRequests--;
        })
        .then(function(response) {
          $templateCache.put(tpl, response.data);
          return response.data;
        }, handleError);

      function handleError(resp) {
        if (!ignoreRequestError) {
          throw $templateRequestMinErr('tpload', 'Failed to load template: {0} (HTTP status: {1} {2})',
            tpl, resp.status, resp.statusText);
        }
        return $q.reject(resp);
      }
    }