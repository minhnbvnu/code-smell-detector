function preventXHR(source, propsToMatch, customResponseText) {
        if (typeof Proxy === "undefined") {
          return;
        }
        var nativeOpen = window.XMLHttpRequest.prototype.open;
        var nativeSend = window.XMLHttpRequest.prototype.send;
        var nativeGetResponseHeader = window.XMLHttpRequest.prototype.getResponseHeader;
        var nativeGetAllResponseHeaders = window.XMLHttpRequest.prototype.getAllResponseHeaders;
        var xhrData;
        var modifiedResponse = "";
        var modifiedResponseText = "";
        var openWrapper = function openWrapper(target, thisArg, args) {
          xhrData = getXhrData.apply(null, args);
          if (typeof propsToMatch === "undefined") {
            logMessage(source, "xhr( ".concat(objectToString(xhrData), " )"), true);
            hit(source);
          } else if (matchRequestProps(source, propsToMatch, xhrData)) {
            thisArg.shouldBePrevented = true;
            thisArg.xhrData = xhrData;
          }
          if (thisArg.shouldBePrevented) {
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
          if (thisArg.responseType === "blob") {
            modifiedResponse = new Blob();
          }
          if (thisArg.responseType === "arraybuffer") {
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
          var forgedRequest = new XMLHttpRequest();
          forgedRequest.addEventListener("readystatechange", function () {
            if (forgedRequest.readyState !== 4) {
              return;
            }
            var readyState = forgedRequest.readyState,
              responseURL = forgedRequest.responseURL,
              responseXML = forgedRequest.responseXML,
              statusText = forgedRequest.statusText;
            Object.defineProperties(thisArg, {
              readyState: {
                value: readyState,
                writable: false
              },
              statusText: {
                value: statusText,
                writable: false
              },
              responseURL: {
                value: responseURL || thisArg.xhrData.url,
                writable: false
              },
              responseXML: {
                value: responseXML,
                writable: false
              },
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
          nativeOpen.apply(forgedRequest, [thisArg.xhrData.method, thisArg.xhrData.url]);
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
        var getHeaderWrapper = function getHeaderWrapper(target, thisArg, args) {
          if (!thisArg.shouldBePrevented) {
            return nativeGetResponseHeader.apply(thisArg, args);
          }
          if (!thisArg.collectedHeaders.length) {
            return null;
          }
          var searchHeaderName = args[0].toLowerCase();
          var matchedHeader = thisArg.collectedHeaders.find(function (header) {
            var headerName = header[0].toLowerCase();
            return headerName === searchHeaderName;
          });
          return matchedHeader ? matchedHeader[1] : null;
        };
        var getAllHeadersWrapper = function getAllHeadersWrapper(target, thisArg) {
          if (!thisArg.shouldBePrevented) {
            return nativeGetAllResponseHeaders.call(thisArg);
          }
          if (!thisArg.collectedHeaders.length) {
            return "";
          }
          var allHeadersStr = thisArg.collectedHeaders.map(function (header) {
            var headerName = header[0];
            var headerValue = header[1];
            return "".concat(headerName.toLowerCase(), ": ").concat(headerValue);
          }).join("\r\n");
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