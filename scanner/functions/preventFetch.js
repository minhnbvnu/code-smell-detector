function preventFetch(source, propsToMatch) {
        var responseBody = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "emptyObj";
        var responseType = arguments.length > 3 ? arguments[3] : undefined;
        if (typeof fetch === "undefined" || typeof Proxy === "undefined" || typeof Response === "undefined") {
          return;
        }
        var nativeRequestClone = Request.prototype.clone;
        var strResponseBody;
        if (responseBody === "" || responseBody === "emptyObj") {
          strResponseBody = "{}";
        } else if (responseBody === "emptyArr") {
          strResponseBody = "[]";
        } else if (responseBody === "emptyStr") {
          strResponseBody = "";
        } else {
          logMessage(source, "Invalid responseBody parameter: '".concat(responseBody, "'"));
          return;
        }
        var isResponseTypeSpecified = typeof responseType !== "undefined";
        var isResponseTypeSupported = function isResponseTypeSupported(responseType) {
          var SUPPORTED_TYPES = ["default", "opaque"];
          return SUPPORTED_TYPES.includes(responseType);
        };
        if (isResponseTypeSpecified && !isResponseTypeSupported(responseType)) {
          logMessage(source, "Invalid responseType parameter: '".concat(responseType, "'"));
          return;
        }
        var handlerWrapper = async function handlerWrapper(target, thisArg, args) {
          var shouldPrevent = false;
          var fetchData = getFetchData(args, nativeRequestClone);
          if (typeof propsToMatch === "undefined") {
            logMessage(source, "fetch( ".concat(objectToString(fetchData), " )"), true);
            hit(source);
            return Reflect.apply(target, thisArg, args);
          }
          shouldPrevent = matchRequestProps(source, propsToMatch, fetchData);
          if (shouldPrevent) {
            hit(source);
            try {
              var origResponse = await Reflect.apply(target, thisArg, args);
              if (!origResponse.ok) {
                return noopPromiseResolve(strResponseBody, fetchData.url, responseType);
              }
              return modifyResponse(origResponse, {
                body: strResponseBody,
                type: responseType
              });
            } catch (ex) {
              return noopPromiseResolve(strResponseBody, fetchData.url, responseType);
            }
          }
          return Reflect.apply(target, thisArg, args);
        };
        var fetchHandler = {
          apply: handlerWrapper
        };
        fetch = new Proxy(fetch, fetchHandler);
      }