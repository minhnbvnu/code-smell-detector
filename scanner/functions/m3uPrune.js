function m3uPrune(source, propsToRemove) {
        var urlToMatch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
        if (typeof Reflect === "undefined" || typeof fetch === "undefined" || typeof Proxy === "undefined" || typeof Response === "undefined") {
          return;
        }
        var shouldPruneResponse = false;
        var urlMatchRegexp = toRegExp(urlToMatch);
        var SEGMENT_MARKER = "#";
        var AD_MARKER = {
          ASSET: "#EXT-X-ASSET:",
          CUE: "#EXT-X-CUE:",
          CUE_IN: "#EXT-X-CUE-IN",
          DISCONTINUITY: "#EXT-X-DISCONTINUITY",
          EXTINF: "#EXTINF",
          EXTM3U: "#EXTM3U",
          SCTE35: "#EXT-X-SCTE35:"
        };
        var COMCAST_AD_MARKER = {
          AD: "-AD-",
          VAST: "-VAST-",
          VMAP_AD: "-VMAP-AD-",
          VMAP_AD_BREAK: "#EXT-X-VMAP-AD-BREAK:"
        };
        var TAGS_ALLOWLIST = ["#EXT-X-TARGETDURATION", "#EXT-X-MEDIA-SEQUENCE", "#EXT-X-DISCONTINUITY-SEQUENCE", "#EXT-X-ENDLIST", "#EXT-X-PLAYLIST-TYPE", "#EXT-X-I-FRAMES-ONLY", "#EXT-X-MEDIA", "#EXT-X-STREAM-INF", "#EXT-X-I-FRAME-STREAM-INF", "#EXT-X-SESSION-DATA", "#EXT-X-SESSION-KEY", "#EXT-X-INDEPENDENT-SEGMENTS", "#EXT-X-START"];
        var isAllowedTag = function isAllowedTag(str) {
          return TAGS_ALLOWLIST.some(function (el) {
            return str.startsWith(el);
          });
        };
        var pruneExtinfFromVmapBlock = function pruneExtinfFromVmapBlock(lines, i) {
          var array = lines.slice();
          var index = i;
          if (array[index].includes(AD_MARKER.EXTINF)) {
            array[index] = undefined;
            index += 1;
            if (array[index].includes(AD_MARKER.DISCONTINUITY)) {
              array[index] = undefined;
              index += 1;
              var prunedExtinf = pruneExtinfFromVmapBlock(array, index);
              array = prunedExtinf.array;
              index = prunedExtinf.index;
            }
          }
          return {
            array: array,
            index: index
          };
        };
        var pruneVmapBlock = function pruneVmapBlock(lines) {
          var array = lines.slice();
          for (var i = 0; i < array.length - 1; i += 1) {
            if (array[i].includes(COMCAST_AD_MARKER.VMAP_AD) || array[i].includes(COMCAST_AD_MARKER.VAST) || array[i].includes(COMCAST_AD_MARKER.AD)) {
              array[i] = undefined;
              if (array[i + 1].includes(AD_MARKER.EXTINF)) {
                i += 1;
                var prunedExtinf = pruneExtinfFromVmapBlock(array, i);
                array = prunedExtinf.array;
                i = prunedExtinf.index - 1;
              }
            }
          }
          return array;
        };
        var pruneSpliceoutBlock = function pruneSpliceoutBlock(line, index, array) {
          if (!line.startsWith(AD_MARKER.CUE)) {
            return line;
          }
          line = undefined;
          index += 1;
          if (array[index].startsWith(AD_MARKER.ASSET)) {
            array[index] = undefined;
            index += 1;
          }
          if (array[index].startsWith(AD_MARKER.SCTE35)) {
            array[index] = undefined;
            index += 1;
          }
          if (array[index].startsWith(AD_MARKER.CUE_IN)) {
            array[index] = undefined;
            index += 1;
          }
          if (array[index].startsWith(AD_MARKER.SCTE35)) {
            array[index] = undefined;
          }
          return line;
        };
        var removeM3ULineRegexp = toRegExp(propsToRemove);
        var pruneInfBlock = function pruneInfBlock(line, index, array) {
          if (!line.startsWith(AD_MARKER.EXTINF)) {
            return line;
          }
          if (!removeM3ULineRegexp.test(array[index + 1])) {
            return line;
          }
          if (!isAllowedTag(array[index])) {
            array[index] = undefined;
          }
          index += 1;
          if (!isAllowedTag(array[index])) {
            array[index] = undefined;
          }
          index += 1;
          if (array[index].startsWith(AD_MARKER.DISCONTINUITY)) {
            array[index] = undefined;
          }
          return line;
        };
        var pruneSegments = function pruneSegments(lines) {
          for (var i = 0; i < lines.length - 1; i += 1) {
            var _lines$i;
            if ((_lines$i = lines[i]) !== null && _lines$i !== void 0 && _lines$i.startsWith(SEGMENT_MARKER) && removeM3ULineRegexp.test(lines[i])) {
              var segmentName = lines[i].substring(0, lines[i].indexOf(":"));
              if (!segmentName) {
                return lines;
              }
              lines[i] = undefined;
              i += 1;
              for (var j = i; j < lines.length; j += 1) {
                if (!lines[j].includes(segmentName) && !isAllowedTag(lines[j])) {
                  lines[j] = undefined;
                } else {
                  i = j - 1;
                  break;
                }
              }
            }
          }
          return lines;
        };
        var isM3U = function isM3U(text) {
          if (typeof text === "string") {
            var trimmedText = text.trim();
            return trimmedText.startsWith(AD_MARKER.EXTM3U) || trimmedText.startsWith(COMCAST_AD_MARKER.VMAP_AD_BREAK);
          }
          return false;
        };
        var isPruningNeeded = function isPruningNeeded(text, regexp) {
          return isM3U(text) && regexp.test(text);
        };
        var pruneM3U = function pruneM3U(text) {
          var lines = text.split(/\r?\n/);
          if (text.includes(COMCAST_AD_MARKER.VMAP_AD_BREAK)) {
            lines = pruneVmapBlock(lines);
            return lines.filter(function (l) {
              return !!l;
            }).join("\n");
          }
          lines = pruneSegments(lines);
          return lines.map(function (line, index, array) {
            if (typeof line === "undefined") {
              return line;
            }
            line = pruneSpliceoutBlock(line, index, array);
            if (typeof line !== "undefined") {
              line = pruneInfBlock(line, index, array);
            }
            return line;
          }).filter(function (l) {
            return !!l;
          }).join("\n");
        };
        var nativeOpen = window.XMLHttpRequest.prototype.open;
        var nativeSend = window.XMLHttpRequest.prototype.send;
        var xhrData;
        var openWrapper = function openWrapper(target, thisArg, args) {
          xhrData = getXhrData.apply(null, args);
          if (matchRequestProps(source, urlToMatch, xhrData)) {
            thisArg.shouldBePruned = true;
          }
          if (thisArg.shouldBePruned) {
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
          var allowedResponseTypeValues = ["", "text"];
          if (!thisArg.shouldBePruned || !allowedResponseTypeValues.includes(thisArg.responseType)) {
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
            if (!propsToRemove) {
              if (isM3U(response)) {
                var message = "XMLHttpRequest.open() URL: ".concat(responseURL, "\nresponse: ").concat(response);
                logMessage(source, message);
              }
            } else {
              shouldPruneResponse = isPruningNeeded(response, removeM3ULineRegexp);
            }
            var responseContent = shouldPruneResponse ? pruneM3U(response) : response;
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
                value: responseContent,
                writable: false
              },
              responseText: {
                value: responseContent,
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
        var nativeFetch = window.fetch;
        var fetchWrapper = async function fetchWrapper(target, thisArg, args) {
          var fetchURL = args[0] instanceof Request ? args[0].url : args[0];
          if (typeof fetchURL !== "string" || fetchURL.length === 0) {
            return Reflect.apply(target, thisArg, args);
          }
          if (urlMatchRegexp.test(fetchURL)) {
            var response = await nativeFetch(...args);
            var clonedResponse = response.clone();
            var responseText = await response.text();
            if (!propsToRemove && isM3U(responseText)) {
              var message = "fetch URL: ".concat(fetchURL, "\nresponse text: ").concat(responseText);
              logMessage(source, message);
              return clonedResponse;
            }
            if (isPruningNeeded(responseText, removeM3ULineRegexp)) {
              var prunedText = pruneM3U(responseText);
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