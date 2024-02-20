function handleError(resp) {
        if (!ignoreRequestError) {
          throw $templateRequestMinErr('tpload', 'Failed to load template: {0} (HTTP status: {1} {2})',
            tpl, resp.status, resp.statusText);
        }
        return $q.reject(resp);
      }