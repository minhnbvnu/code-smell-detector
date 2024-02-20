function trustedReplaceFetchResponse(source) {
        var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        var replacement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
        var propsToMatch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
        if (typeof fetch === "undefined" || typeof Proxy === "undefined" || typeof Response === "undefined") {
          return;
        }
        if (pattern === "" && replacement !== "") {
          logMessage(source, "Pattern argument should not be empty string");
          return;
        }
        var shouldLog = pattern === "" && replacement === "";
        var nativeRequestClone = Request.prototype.clone;
        var nativeFetch = fetch;
        var shouldReplace = false;
        var fetchData;
        var handlerWrapper = function handlerWrapper(target, thisArg, args) {
          fetchData = getFetchData(args, nativeRequestClone);
          if (shouldLog) {
            logMessage(source, "fetch( ".concat(objectToString(fetchData), " )"), true);
            hit(source);
            return Reflect.apply(target, thisArg, args);
          }
          shouldReplace = matchRequestProps(source, propsToMatch, fetchData);
          if (!shouldReplace) {
            return Reflect.apply(target, thisArg, args);
          }
          var forgeResponse = function forgeResponse(response, textContent) {
            var bodyUsed = response.bodyUsed,
              headers = response.headers,
              ok = response.ok,
              redirected = response.redirected,
              status = response.status,
              statusText = response.statusText,
              type = response.type,
              url = response.url;
            var forgedResponse = new Response(textContent, {
              status: status,
              statusText: statusText,
              headers: headers
            });
            Object.defineProperties(forgedResponse, {
              url: {
                value: url
              },
              type: {
                value: type
              },
              ok: {
                value: ok
              },
              bodyUsed: {
                value: bodyUsed
              },
              redirected: {
                value: redirected
              }
            });
            return forgedResponse;
          };
          return nativeFetch.apply(null, args).then(function (response) {
            return response.text().then(function (bodyText) {
              var patternRegexp = pattern === "*" ? /(\n|.)*/ : toRegExp(pattern);
              var modifiedTextContent = bodyText.replace(patternRegexp, replacement);
              var forgedResponse = forgeResponse(response, modifiedTextContent);
              hit(source);
              return forgedResponse;
            }).catch(function () {
              var fetchDataStr = objectToString(fetchData);
              var message = "Response body can't be converted to text: ".concat(fetchDataStr);
              logMessage(source, message);
              return Reflect.apply(target, thisArg, args);
            });
          }).catch(function () {
            return Reflect.apply(target, thisArg, args);
          });
        };
        var fetchHandler = {
          apply: handlerWrapper
        };
        fetch = new Proxy(fetch, fetchHandler);
      }