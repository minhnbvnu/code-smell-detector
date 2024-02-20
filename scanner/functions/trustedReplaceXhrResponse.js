function trustedReplaceXhrResponse(source) {
        var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        var replacement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
        var propsToMatch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
        if (typeof Proxy === "undefined") {
          return;
        }
        if (pattern === "" && replacement !== "") {
          var message = "Pattern argument should not be empty string.";
          logMessage(source, message);
          return;
        }
        var shouldLog = pattern === "" && replacement === "";
        var nativeOpen = window.XMLHttpRequest.prototype.open;
        var nativeSend = window.XMLHttpRequest.prototype.send;
        var xhrData;
        var openWrapper = function openWrapper(target, thisArg, args) {
          xhrData = getXhrData.apply(null, args);
          if (shouldLog) {
            var _message = "xhr( ".concat(objectToString(xhrData), " )");
            logMessage(source, _message, true);
            hit(source);
            return Reflect.apply(target, thisArg, args);
          }
          if (matchRequestProps(source, propsToMatch, xhrData)) {
            thisArg.shouldBePrevented = true;
            thisArg.headersReceived = !!thisArg.headersReceived;
          }
          if (thisArg.shouldBePrevented && !thisArg.headersReceived) {
            thisArg.headersReceived = true;
            thisArg.collectedHeaders = [];
            var setRequestHeaderWrapper = function setRequestHeaderWrapper(target, thisArg, args) {
              thisArg.collectedHeaders.push(args);
              return Reflect.apply(target, thisArg, args);
            };
            var setRequestHeaderHandler = {
              apply: setRequestHeaderWrapper
            };
            thisArg.setRequestHeader = new Proxy(thisArg.setRequestHeader, setRequestHeaderHandler);
          }
          return Reflect.apply(target, thisArg, args);
        };
        var sendWrapper = function sendWrapper(target, thisArg, args) {
          if (!thisArg.shouldBePrevented) {
            return Reflect.apply(target, thisArg, args);
          }
          var forgedRequest = new XMLHttpRequest();
          forgedRequest.addEventListener("readystatechange", function () {
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
            var content = responseText || response;
            if (typeof content !== "string") {
              return;
            }
            var patternRegexp = pattern === "*" ? /(\n|.)*/ : toRegExp(pattern);
            var modifiedContent = content.replace(patternRegexp, replacement);
            Object.defineProperties(thisArg, {
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
              response: {
                value: modifiedContent,
                writable: false
              },
              responseText: {
                value: modifiedContent,
                writable: false
              }
            });
            setTimeout(function () {
              var stateEvent = new Event("readystatechange");
              thisArg.dispatchEvent(stateEvent);
              var loadEvent = new Event("load");
              thisArg.dispatchEvent(loadEvent);
              var loadEndEvent = new Event("loadend");
              thisArg.dispatchEvent(loadEndEvent);
            }, 1);
            hit(source);
          });
          nativeOpen.apply(forgedRequest, [xhrData.method, xhrData.url]);
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