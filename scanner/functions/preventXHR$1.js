function preventXHR$1(source, propsToMatch, customResponseText) {
      // do nothing if browser does not support Proxy (e.g. Internet Explorer)
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
      if (typeof Proxy === 'undefined') {
        return;
      }
      var nativeOpen = window.XMLHttpRequest.prototype.open;
      var nativeSend = window.XMLHttpRequest.prototype.send;
      var nativeGetResponseHeader = window.XMLHttpRequest.prototype.getResponseHeader;
      var nativeGetAllResponseHeaders = window.XMLHttpRequest.prototype.getAllResponseHeaders;
      var xhrData;
      var modifiedResponse = '';
      var modifiedResponseText = '';
      var openWrapper = function openWrapper(target, thisArg, args) {
        // Get original request properties
        // eslint-disable-next-line prefer-spread
        xhrData = getXhrData.apply(null, args);
        if (typeof propsToMatch === 'undefined') {
          // Log if no propsToMatch given
          logMessage(source, "xhr( ".concat(objectToString$1(xhrData), " )"), true);
          hit(source);
        } else if (matchRequestProps(source, propsToMatch, xhrData)) {
          thisArg.shouldBePrevented = true;
          // Add xhrData to thisArg to keep original values in case of multiple requests
          // https://github.com/AdguardTeam/Scriptlets/issues/347
          thisArg.xhrData = xhrData;
        }

        // Trap setRequestHeader of target xhr object to mimic request headers later;
        // needed for getResponseHeader() and getAllResponseHeaders() methods
        if (thisArg.shouldBePrevented) {
          thisArg.collectedHeaders = [];
          var setRequestHeaderWrapper = function setRequestHeaderWrapper(target, thisArg, args) {
            // Collect headers
            thisArg.collectedHeaders.push(args);
            return Reflect.apply(target, thisArg, args);
          };
          var setRequestHeaderHandler = {
            apply: setRequestHeaderWrapper
          };
          // setRequestHeader() can only be called on xhr.open(),
          // so we can safely proxy it here
          thisArg.setRequestHeader = new Proxy(thisArg.setRequestHeader, setRequestHeaderHandler);
        }
        return Reflect.apply(target, thisArg, args);
      };
      var sendWrapper = function sendWrapper(target, thisArg, args) {
        if (!thisArg.shouldBePrevented) {
          return Reflect.apply(target, thisArg, args);
        }
        if (thisArg.responseType === 'blob') {
          modifiedResponse = new Blob();
        }
        if (thisArg.responseType === 'arraybuffer') {
          modifiedResponse = new ArrayBuffer();
        }
        if (customResponseText) {
          var randomText = generateRandomResponse(customResponseText);
          if (randomText) {
            modifiedResponseText = randomText;
          } else {
            logMessage(source, "Invalid randomize parameter: '".concat(customResponseText, "'"));
          }
        }

        /**
         * Create separate XHR request with original request's input
         * to be able to collect response data without triggering
         * listeners on original XHR object
         */
        var forgedRequest = new XMLHttpRequest();
        forgedRequest.addEventListener('readystatechange', function () {
          if (forgedRequest.readyState !== 4) {
            return;
          }
          var readyState = forgedRequest.readyState,
            responseURL = forgedRequest.responseURL,
            responseXML = forgedRequest.responseXML,
            statusText = forgedRequest.statusText;

          // Mock response object
          Object.defineProperties(thisArg, {
            // original values
            readyState: {
              value: readyState,
              writable: false
            },
            statusText: {
              value: statusText,
              writable: false
            },
            // If the request is blocked, responseURL is an empty string
            responseURL: {
              value: responseURL || thisArg.xhrData.url,
              writable: false
            },
            responseXML: {
              value: responseXML,
              writable: false
            },
            // modified values
            status: {
              value: 200,
              writable: false
            },
            response: {
              value: modifiedResponse,
              writable: false
            },
            responseText: {
              value: modifiedResponseText,
              writable: false
            }
          });

          // Mock events
          setTimeout(function () {
            var stateEvent = new Event('readystatechange');
            thisArg.dispatchEvent(stateEvent);
            var loadEvent = new Event('load');
            thisArg.dispatchEvent(loadEvent);
            var loadEndEvent = new Event('loadend');
            thisArg.dispatchEvent(loadEndEvent);
          }, 1);
          hit(source);
        });
        nativeOpen.apply(forgedRequest, [thisArg.xhrData.method, thisArg.xhrData.url]);

        // Mimic request headers before sending
        // setRequestHeader can only be called on open request objects
        thisArg.collectedHeaders.forEach(function (header) {
          var name = header[0];
          var value = header[1];
          forgedRequest.setRequestHeader(name, value);
        });
        try {
          nativeSend.call(forgedRequest, args);
        } catch (_unused) {
          return Reflect.apply(target, thisArg, args);
        }
        return undefined;
      };

      /**
       * Mock XMLHttpRequest.prototype.getHeaderHandler() to avoid adblocker detection.
       *
       * @param {Function} target XMLHttpRequest.prototype.getHeaderHandler().
       * @param {XMLHttpRequest} thisArg The request.
       * @param {string[]} args Header name is passed as first argument.
       *
       * @returns {string|null} Header value or null if header is not set.
       */
      var getHeaderWrapper = function getHeaderWrapper(target, thisArg, args) {
        if (!thisArg.shouldBePrevented) {
          return nativeGetResponseHeader.apply(thisArg, args);
        }
        if (!thisArg.collectedHeaders.length) {
          return null;
        }
        // The search for the header name is case-insensitive
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getResponseHeader
        var searchHeaderName = args[0].toLowerCase();
        var matchedHeader = thisArg.collectedHeaders.find(function (header) {
          var headerName = header[0].toLowerCase();
          return headerName === searchHeaderName;
        });
        return matchedHeader ? matchedHeader[1] : null;
      };

      /**
       * Mock XMLHttpRequest.prototype.getAllResponseHeaders() to avoid adblocker detection.
       *
       * @param {Function} target XMLHttpRequest.prototype.getAllResponseHeaders().
       * @param {XMLHttpRequest} thisArg The request.
       *
       * @returns {string} All headers as a string. For no headers an empty string is returned.
       */
      var getAllHeadersWrapper = function getAllHeadersWrapper(target, thisArg) {
        if (!thisArg.shouldBePrevented) {
          return nativeGetAllResponseHeaders.call(thisArg);
        }
        if (!thisArg.collectedHeaders.length) {
          return '';
        }
        var allHeadersStr = thisArg.collectedHeaders.map(function (header) {
          /**
           * TODO: array destructuring may be used here
           * after the typescript implementation and bundling refactoring
           * as now there is an error: slicedToArray is not defined
           */
          var headerName = header[0];
          var headerValue = header[1];
          // In modern browsers, the header names are returned in all lower case, as per the latest spec.
          // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders
          return "".concat(headerName.toLowerCase(), ": ").concat(headerValue);
        }).join('\r\n');
        return allHeadersStr;
      };
      var openHandler = {
        apply: openWrapper
      };
      var sendHandler = {
        apply: sendWrapper
      };
      var getHeaderHandler = {
        apply: getHeaderWrapper
      };
      var getAllHeadersHandler = {
        apply: getAllHeadersWrapper
      };
      XMLHttpRequest.prototype.open = new Proxy(XMLHttpRequest.prototype.open, openHandler);
      XMLHttpRequest.prototype.send = new Proxy(XMLHttpRequest.prototype.send, sendHandler);
      XMLHttpRequest.prototype.getResponseHeader = new Proxy(XMLHttpRequest.prototype.getResponseHeader, getHeaderHandler);
      XMLHttpRequest.prototype.getAllResponseHeaders = new Proxy(XMLHttpRequest.prototype.getAllResponseHeaders, getAllHeadersHandler);
    }