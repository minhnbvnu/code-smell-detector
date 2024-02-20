function trustedReplaceXhrResponse$1(source) {
      var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var replacement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var propsToMatch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      // do nothing if browser does not support Proxy (e.g. Internet Explorer)
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
      if (typeof Proxy === 'undefined') {
        return;
      }

      // Only allow pattern as empty string for logging purposes
      if (pattern === '' && replacement !== '') {
        var message = 'Pattern argument should not be empty string.';
        logMessage(source, message);
        return;
      }
      var shouldLog = pattern === '' && replacement === '';
      var nativeOpen = window.XMLHttpRequest.prototype.open;
      var nativeSend = window.XMLHttpRequest.prototype.send;
      var xhrData;
      var openWrapper = function openWrapper(target, thisArg, args) {
        // eslint-disable-next-line prefer-spread
        xhrData = getXhrData.apply(null, args);
        if (shouldLog) {
          // Log if no propsToMatch given
          var _message = "xhr( ".concat(objectToString$1(xhrData), " )");
          logMessage(source, _message, true);
          hit(source);
          return Reflect.apply(target, thisArg, args);
        }
        if (matchRequestProps(source, propsToMatch, xhrData)) {
          thisArg.shouldBePrevented = true;
          thisArg.headersReceived = !!thisArg.headersReceived;
        }

        // Trap setRequestHeader of target xhr object to mimic request headers later
        if (thisArg.shouldBePrevented && !thisArg.headersReceived) {
          thisArg.headersReceived = true;
          thisArg.collectedHeaders = [];
          var setRequestHeaderWrapper = function setRequestHeaderWrapper(target, thisArg, args) {
            // Collect headers
            thisArg.collectedHeaders.push(args);
            return Reflect.apply(target, thisArg, args);
          };
          var setRequestHeaderHandler = {
            apply: setRequestHeaderWrapper
          };

          // setRequestHeader can only be called on open xhr object,
          // so we can safely proxy it here
          thisArg.setRequestHeader = new Proxy(thisArg.setRequestHeader, setRequestHeaderHandler);
        }
        return Reflect.apply(target, thisArg, args);
      };
      var sendWrapper = function sendWrapper(target, thisArg, args) {
        if (!thisArg.shouldBePrevented) {
          return Reflect.apply(target, thisArg, args);
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
            response = forgedRequest.response,
            responseText = forgedRequest.responseText,
            responseURL = forgedRequest.responseURL,
            responseXML = forgedRequest.responseXML,
            status = forgedRequest.status,
            statusText = forgedRequest.statusText;

          // Extract content from response
          var content = responseText || response;
          if (typeof content !== 'string') {
            return;
          }
          var patternRegexp = pattern === '*' ? /(\n|.)*/ : toRegExp(pattern);
          var modifiedContent = content.replace(patternRegexp, replacement);

          // Manually put required values into target XHR object
          // as thisArg can't be redefined and XHR objects can't be (re)assigned or copied
          Object.defineProperties(thisArg, {
            // original values
            readyState: {
              value: readyState,
              writable: false
            },
            responseURL: {
              value: responseURL,
              writable: false
            },
            responseXML: {
              value: responseXML,
              writable: false
            },
            status: {
              value: status,
              writable: false
            },
            statusText: {
              value: statusText,
              writable: false
            },
            // modified values
            response: {
              value: modifiedContent,
              writable: false
            },
            responseText: {
              value: modifiedContent,
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
        nativeOpen.apply(forgedRequest, [xhrData.method, xhrData.url]);

        // Mimic request headers before sending
        // setRequestHeader can only be called on open request objects
        thisArg.collectedHeaders.forEach(function (header) {
          var name = header[0];
          var value = header[1];
          forgedRequest.setRequestHeader(name, value);
        });
        thisArg.collectedHeaders = [];
        try {
          nativeSend.call(forgedRequest, args);
        } catch (_unused) {
          return Reflect.apply(target, thisArg, args);
        }
        return undefined;
      };
      var openHandler = {
        apply: openWrapper
      };
      var sendHandler = {
        apply: sendWrapper
      };
      XMLHttpRequest.prototype.open = new Proxy(XMLHttpRequest.prototype.open, openHandler);
      XMLHttpRequest.prototype.send = new Proxy(XMLHttpRequest.prototype.send, sendHandler);
    }