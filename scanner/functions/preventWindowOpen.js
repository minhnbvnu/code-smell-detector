function preventWindowOpen(source) {
        var match = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "*";
        var delay = arguments.length > 2 ? arguments[2] : undefined;
        var replacement = arguments.length > 3 ? arguments[3] : undefined;
        var nativeOpen = window.open;
        var isNewSyntax = match !== "0" && match !== "1";
        var oldOpenWrapper = function oldOpenWrapper(str) {
          match = Number(match) > 0;
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          if (!isValidStrPattern(delay)) {
            logMessage(source, "Invalid parameter: ".concat(delay));
            return nativeOpen.apply(window, [str, ...args]);
          }
          var searchRegexp = toRegExp(delay);
          if (match !== searchRegexp.test(str)) {
            return nativeOpen.apply(window, [str, ...args]);
          }
          hit(source);
          return handleOldReplacement(replacement);
        };
        var newOpenWrapper = function newOpenWrapper(url) {
          var shouldLog = replacement && replacement.includes("log");
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }
          if (shouldLog) {
            var argsStr = args && args.length > 0 ? ", ".concat(args.join(", ")) : "";
            var message = "".concat(url).concat(argsStr);
            logMessage(source, message, true);
            hit(source);
          }
          var shouldPrevent = false;
          if (match === "*") {
            shouldPrevent = true;
          } else if (isValidMatchStr(match)) {
            var _parseMatchArg = parseMatchArg(match),
              isInvertedMatch = _parseMatchArg.isInvertedMatch,
              matchRegexp = _parseMatchArg.matchRegexp;
            shouldPrevent = matchRegexp.test(url) !== isInvertedMatch;
          } else {
            logMessage(source, "Invalid parameter: ".concat(match));
            shouldPrevent = false;
          }
          if (shouldPrevent) {
            var parsedDelay = parseInt(delay, 10);
            var result;
            if (nativeIsNaN(parsedDelay)) {
              result = noopNull();
            } else {
              var decoyArgs = {
                replacement: replacement,
                url: url,
                delay: parsedDelay
              };
              var decoy = createDecoy(decoyArgs);
              var popup = decoy.contentWindow;
              if (typeof popup === "object" && popup !== null) {
                Object.defineProperty(popup, "closed", {
                  value: false
                });
                Object.defineProperty(popup, "opener", {
                  value: window
                });
                Object.defineProperty(popup, "frameElement", {
                  value: null
                });
              } else {
                var nativeGetter = decoy.contentWindow && decoy.contentWindow.get;
                Object.defineProperty(decoy, "contentWindow", {
                  get: getPreventGetter(nativeGetter)
                });
                popup = decoy.contentWindow;
              }
              result = popup;
            }
            hit(source);
            return result;
          }
          return nativeOpen.apply(window, [url, ...args]);
        };
        window.open = isNewSyntax ? newOpenWrapper : oldOpenWrapper;
        window.open.toString = nativeOpen.toString.bind(nativeOpen);
      }