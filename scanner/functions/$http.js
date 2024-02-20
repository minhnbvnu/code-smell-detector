function $http(requestConfig) {

      if (!isObject(requestConfig)) {
        throw minErr('$http')('badreq', 'Http request configuration must be an object.  Received: {0}', requestConfig);
      }

      if (!isString(requestConfig.url)) {
        throw minErr('$http')('badreq', 'Http request configuration url must be a string.  Received: {0}', requestConfig.url);
      }

      var config = extend({
        method: 'get',
        transformRequest: defaults.transformRequest,
        transformResponse: defaults.transformResponse,
        paramSerializer: defaults.paramSerializer
      }, requestConfig);

      config.headers = mergeHeaders(requestConfig);
      config.method = uppercase(config.method);
      config.paramSerializer = isString(config.paramSerializer) ?
        $injector.get(config.paramSerializer) : config.paramSerializer;

      var serverRequest = function(config) {
        var headers = config.headers;
        var reqData = transformData(config.data, headersGetter(headers), undefined, config.transformRequest);

        // strip content-type if data is undefined
        if (isUndefined(reqData)) {
          forEach(headers, function(value, header) {
            if (lowercase(header) === 'content-type') {
                delete headers[header];
            }
          });
        }

        if (isUndefined(config.withCredentials) && !isUndefined(defaults.withCredentials)) {
          config.withCredentials = defaults.withCredentials;
        }

        // send request
        return sendReq(config, reqData).then(transformResponse, transformResponse);
      };

      var chain = [serverRequest, undefined];
      var promise = $q.when(config);

      // apply interceptors
      forEach(reversedInterceptors, function(interceptor) {
        if (interceptor.request || interceptor.requestError) {
          chain.unshift(interceptor.request, interceptor.requestError);
        }
        if (interceptor.response || interceptor.responseError) {
          chain.push(interceptor.response, interceptor.responseError);
        }
      });

      while (chain.length) {
        var thenFn = chain.shift();
        var rejectFn = chain.shift();

        promise = promise.then(thenFn, rejectFn);
      }

      if (useLegacyPromise) {
        promise.success = function(fn) {
          assertArgFn(fn, 'fn');

          promise.then(function(response) {
            fn(response.data, response.status, response.headers, config);
          });
          return promise;
        };

        promise.error = function(fn) {
          assertArgFn(fn, 'fn');

          promise.then(null, function(response) {
            fn(response.data, response.status, response.headers, config);
          });
          return promise;
        };
      } else {
        promise.success = $httpMinErrLegacyFn('success');
        promise.error = $httpMinErrLegacyFn('error');
      }

      return promise;

      function transformResponse(response) {
        // make a copy since the response must be cacheable
        var resp = extend({}, response);
        resp.data = transformData(response.data, response.headers, response.status,
                                  config.transformResponse);
        return (isSuccess(response.status))
          ? resp
          : $q.reject(resp);
      }

      function executeHeaderFns(headers, config) {
        var headerContent, processedHeaders = {};

        forEach(headers, function(headerFn, header) {
          if (isFunction(headerFn)) {
            headerContent = headerFn(config);
            if (headerContent != null) {
              processedHeaders[header] = headerContent;
            }
          } else {
            processedHeaders[header] = headerFn;
          }
        });

        return processedHeaders;
      }

      function mergeHeaders(config) {
        var defHeaders = defaults.headers,
            reqHeaders = extend({}, config.headers),
            defHeaderName, lowercaseDefHeaderName, reqHeaderName;

        defHeaders = extend({}, defHeaders.common, defHeaders[lowercase(config.method)]);

        // using for-in instead of forEach to avoid unnecessary iteration after header has been found
        defaultHeadersIteration:
        for (defHeaderName in defHeaders) {
          lowercaseDefHeaderName = lowercase(defHeaderName);

          for (reqHeaderName in reqHeaders) {
            if (lowercase(reqHeaderName) === lowercaseDefHeaderName) {
              continue defaultHeadersIteration;
            }
          }

          reqHeaders[defHeaderName] = defHeaders[defHeaderName];
        }

        // execute if header value is a function for merged headers
        return executeHeaderFns(reqHeaders, shallowCopy(config));
      }
    }