function transformResponse(response) {
        // make a copy since the response must be cacheable
        var resp = extend({}, response);
        resp.data = transformData(response.data, response.headers, response.status,
                                  config.transformResponse);
        return (isSuccess(response.status))
          ? resp
          : $q.reject(resp);
      }