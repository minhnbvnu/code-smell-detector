function xmlPrune$1(source, propsToRemove) {
      var optionalProp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var urlToMatch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      // do nothing if browser does not support Reflect, fetch or Proxy (e.g. Internet Explorer)
      // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect
      if (typeof Reflect === 'undefined' || typeof fetch === 'undefined' || typeof Proxy === 'undefined' || typeof Response === 'undefined') {
        return;
      }
      var shouldPruneResponse = false;
      var urlMatchRegexp = toRegExp(urlToMatch);
      var XPATH_MARKER = 'xpath(';
      var isXpath = propsToRemove && propsToRemove.startsWith(XPATH_MARKER);

      /**
       * Checks if the document node from the XML document contains propsToRemove
       * if so, returns an array with matched elements, otherwise returns an empty array
       *
       * @param {Node} contextNode - document node from XML document
       * @returns {Array}
       */
      var getXPathElements = function getXPathElements(contextNode) {
        var matchedElements = [];
        try {
          var elementsToRemove = propsToRemove.slice(XPATH_MARKER.length, -1);
          var xpathResult = contextNode.evaluate(elementsToRemove, contextNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
          for (var i = 0; i < xpathResult.snapshotLength; i += 1) {
            matchedElements.push(xpathResult.snapshotItem(i));
          }
        } catch (ex) {
          var message = "Invalid XPath parameter: ".concat(propsToRemove, "\n").concat(ex);
          logMessage(source, message);
        }
        return matchedElements;
      };
      var xPathPruning = function xPathPruning(xPathElements) {
        xPathElements.forEach(function (element) {
          // ELEMENT_NODE
          if (element.nodeType === 1) {
            element.remove();
            // ATTRIBUTE_NODE
          } else if (element.nodeType === 2) {
            element.ownerElement.removeAttribute(element.nodeName);
          }
        });
      };
      var isXML = function isXML(text) {
        // It's necessary to check the type of 'text'
        // because 'text' is obtained from the xhr/fetch response,
        // so it could also be Blob/ArrayBuffer/Object or another type
        if (typeof text === 'string') {
          // Check if "text" starts with "<" and check if it ends with ">"
          // If so, then it might be an XML file and should be pruned or logged
          var trimmedText = text.trim();
          if (trimmedText.startsWith('<') && trimmedText.endsWith('>')) {
            return true;
          }
        }
        return false;
      };
      var createXMLDocument = function createXMLDocument(text) {
        var xmlParser = new DOMParser();
        var xmlDocument = xmlParser.parseFromString(text, 'text/xml');
        return xmlDocument;
      };
      var isPruningNeeded = function isPruningNeeded(response, propsToRemove) {
        if (!isXML(response)) {
          return false;
        }
        var docXML = createXMLDocument(response);
        return isXpath ? getXPathElements(docXML) : !!docXML.querySelector(propsToRemove);
      };
      var pruneXML = function pruneXML(text) {
        if (!isXML(text)) {
          shouldPruneResponse = false;
          return text;
        }
        var xmlDoc = createXMLDocument(text);
        var errorNode = xmlDoc.querySelector('parsererror');
        if (errorNode) {
          return text;
        }
        if (optionalProp !== '' && xmlDoc.querySelector(optionalProp) === null) {
          shouldPruneResponse = false;
          return text;
        }
        var elements = isXpath ? getXPathElements(xmlDoc) : xmlDoc.querySelectorAll(propsToRemove);
        if (!elements.length) {
          shouldPruneResponse = false;
          return text;
        }
        if (isXpath) {
          xPathPruning(elements);
        } else {
          elements.forEach(function (elem) {
            elem.remove();
          });
        }
        var serializer = new XMLSerializer();
        text = serializer.serializeToString(xmlDoc);
        return text;
      };
      var nativeOpen = window.XMLHttpRequest.prototype.open;
      var nativeSend = window.XMLHttpRequest.prototype.send;
      var xhrData;
      var openWrapper = function openWrapper(target, thisArg, args) {
        // eslint-disable-next-line prefer-spread
        xhrData = getXhrData.apply(null, args);
        if (matchRequestProps(source, urlToMatch, xhrData)) {
          thisArg.shouldBePruned = true;
        }

        // Trap setRequestHeader of target xhr object to mimic request headers later
        if (thisArg.shouldBePruned) {
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
        var allowedResponseTypeValues = ['', 'text'];
        // Do nothing if request do not match
        // or response type is not a string
        if (!thisArg.shouldBePruned || !allowedResponseTypeValues.includes(thisArg.responseType)) {
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
          if (!propsToRemove) {
            if (isXML(response)) {
              var message = "XMLHttpRequest.open() URL: ".concat(responseURL, "\nresponse: ").concat(response);
              logMessage(source, message);
              logMessage(source, createXMLDocument(response), true, false);
            }
          } else {
            shouldPruneResponse = isPruningNeeded(response, propsToRemove);
          }
          var responseContent = shouldPruneResponse ? pruneXML(response) : response;
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
              value: responseContent,
              writable: false
            },
            responseText: {
              value: responseContent,
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
      var nativeFetch = window.fetch;
      var fetchWrapper = async function fetchWrapper(target, thisArg, args) {
        var fetchURL = args[0] instanceof Request ? args[0].url : args[0];
        if (typeof fetchURL !== 'string' || fetchURL.length === 0) {
          return Reflect.apply(target, thisArg, args);
        }
        if (urlMatchRegexp.test(fetchURL)) {
          var response = await nativeFetch(...args);
          // It's required to fix issue with - Request with body": Failed to execute 'fetch' on 'Window':
          // Cannot construct a Request with a Request object that has already been used.
          // For example, it occurs on youtube when scriptlet is used without arguments
          var clonedResponse = response.clone();
          var responseText = await response.text();
          shouldPruneResponse = isPruningNeeded(responseText, propsToRemove);
          if (!shouldPruneResponse) {
            var message = "fetch URL: ".concat(fetchURL, "\nresponse text: ").concat(responseText);
            logMessage(source, message);
            logMessage(source, createXMLDocument(responseText), true, false);
            return clonedResponse;
          }
          var prunedText = pruneXML(responseText);
          if (shouldPruneResponse) {
            hit(source);
            return new Response(prunedText, {
              status: response.status,
              statusText: response.statusText,
              headers: response.headers
            });
          }
          return clonedResponse;
        }
        return Reflect.apply(target, thisArg, args);
      };
      var fetchHandler = {
        apply: fetchWrapper
      };
      window.fetch = new Proxy(window.fetch, fetchHandler);
    }