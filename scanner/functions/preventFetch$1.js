function preventFetch$1(source, propsToMatch) {
      var responseBody = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'emptyObj';
      var responseType = arguments.length > 3 ? arguments[3] : undefined;
      // do nothing if browser does not support fetch or Proxy (e.g. Internet Explorer)
      // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
      if (typeof fetch === 'undefined' || typeof Proxy === 'undefined' || typeof Response === 'undefined') {
        return;
      }
      var nativeRequestClone = Request.prototype.clone;
      var strResponseBody;
      if (responseBody === '' || responseBody === 'emptyObj') {
        strResponseBody = '{}';
      } else if (responseBody === 'emptyArr') {
        strResponseBody = '[]';
      } else if (responseBody === 'emptyStr') {
        strResponseBody = '';
      } else {
        logMessage(source, "Invalid responseBody parameter: '".concat(responseBody, "'"));
        return;
      }
      var isResponseTypeSpecified = typeof responseType !== 'undefined';
      var isResponseTypeSupported = function isResponseTypeSupported(responseType) {
        var SUPPORTED_TYPES = ['default', 'opaque'];
        return SUPPORTED_TYPES.includes(responseType);
      };
      // Skip disallowed response types,
      // specified responseType has limited list of possible values
      if (isResponseTypeSpecified && !isResponseTypeSupported(responseType)) {
        logMessage(source, "Invalid responseType parameter: '".concat(responseType, "'"));
        return;
      }
      var handlerWrapper = async function handlerWrapper(target, thisArg, args) {
        var shouldPrevent = false;
        var fetchData = getFetchData(args, nativeRequestClone);
        if (typeof propsToMatch === 'undefined') {
          logMessage(source, "fetch( ".concat(objectToString$1(fetchData), " )"), true);
          hit(source);
          return Reflect.apply(target, thisArg, args);
        }
        shouldPrevent = matchRequestProps(source, propsToMatch, fetchData);
        if (shouldPrevent) {
          hit(source);
          try {
            var origResponse = await Reflect.apply(target, thisArg, args);
            // In the case of apps, the blocked request has status 500
            // and no error is thrown, so it's necessary to check response.ok
            // https://github.com/AdguardTeam/Scriptlets/issues/334
            if (!origResponse.ok) {
              return noopPromiseResolve(strResponseBody, fetchData.url, responseType);
            }
            return modifyResponse(origResponse, {
              body: strResponseBody,
              type: responseType
            });
          } catch (ex) {
            // https://github.com/AdguardTeam/Scriptlets/issues/334
            return noopPromiseResolve(strResponseBody, fetchData.url, responseType);
          }
        }
        return Reflect.apply(target, thisArg, args);
      };
      var fetchHandler = {
        apply: handlerWrapper
      };
      fetch = new Proxy(fetch, fetchHandler); // eslint-disable-line no-global-assign
    }