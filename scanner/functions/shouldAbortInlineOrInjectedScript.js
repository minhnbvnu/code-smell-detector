function shouldAbortInlineOrInjectedScript(stackMatch, stackTrace) {
        var INLINE_SCRIPT_STRING = "inlineScript";
        var INJECTED_SCRIPT_STRING = "injectedScript";
        var INJECTED_SCRIPT_MARKER = "<anonymous>";
        var isInlineScript = function isInlineScript(match) {
          return match.includes(INLINE_SCRIPT_STRING);
        };
        var isInjectedScript = function isInjectedScript(match) {
          return match.includes(INJECTED_SCRIPT_STRING);
        };
        if (!(isInlineScript(stackMatch) || isInjectedScript(stackMatch))) {
          return false;
        }
        var documentURL = window.location.href;
        var pos = documentURL.indexOf("#");
        if (pos !== -1) {
          documentURL = documentURL.slice(0, pos);
        }
        var stackSteps = stackTrace.split("\n").slice(2).map(function (line) {
          return line.trim();
        });
        var stackLines = stackSteps.map(function (line) {
          var stack;
          var getStackTraceURL = /(.*?@)?(\S+)(:\d+):\d+\)?$/.exec(line);
          if (getStackTraceURL) {
            var _stackURL, _stackURL2;
            var stackURL = getStackTraceURL[2];
            if ((_stackURL = stackURL) !== null && _stackURL !== void 0 && _stackURL.startsWith("(")) {
              stackURL = stackURL.slice(1);
            }
            if ((_stackURL2 = stackURL) !== null && _stackURL2 !== void 0 && _stackURL2.startsWith(INJECTED_SCRIPT_MARKER)) {
              var _stackFunction;
              stackURL = INJECTED_SCRIPT_STRING;
              var stackFunction = getStackTraceURL[1] !== undefined ? getStackTraceURL[1].slice(0, -1) : line.slice(0, getStackTraceURL.index).trim();
              if ((_stackFunction = stackFunction) !== null && _stackFunction !== void 0 && _stackFunction.startsWith("at")) {
                stackFunction = stackFunction.slice(2).trim();
              }
              stack = "".concat(stackFunction, " ").concat(stackURL).trim();
            } else {
              stack = stackURL;
            }
          } else {
            stack = line;
          }
          return stack;
        });
        if (stackLines) {
          for (var index = 0; index < stackLines.length; index += 1) {
            if (isInlineScript(stackMatch) && documentURL === stackLines[index]) {
              return true;
            }
            if (isInjectedScript(stackMatch) && stackLines[index].startsWith(INJECTED_SCRIPT_STRING)) {
              return true;
            }
          }
        }
        return false;
      }