function isPruningNeeded(source, root, prunePaths, requiredPaths, stack, nativeObjects) {
        if (!root) {
          return false;
        }
        var nativeStringify = nativeObjects.nativeStringify;
        var shouldProcess;
        if (prunePaths.length === 0 && requiredPaths.length > 0) {
          var rootString = nativeStringify(root);
          var matchRegex = toRegExp(requiredPaths.join(""));
          var shouldLog = matchRegex.test(rootString);
          if (shouldLog) {
            logMessage(source, "".concat(window.location.hostname, "\n").concat(nativeStringify(root, null, 2), "\nStack trace:\n").concat(new Error().stack), true);
            if (root && typeof root === "object") {
              logMessage(source, root, true, false);
            }
            shouldProcess = false;
            return shouldProcess;
          }
        }
        if (stack && !matchStackTrace(stack, new Error().stack || "")) {
          shouldProcess = false;
          return shouldProcess;
        }
        var wildcardSymbols = [".*.", "*.", ".*", ".[].", "[].", ".[]"];
        var _loop = function _loop() {
          var requiredPath = requiredPaths[i];
          var lastNestedPropName = requiredPath.split(".").pop();
          var hasWildcard = wildcardSymbols.some(function (symbol) {
            return requiredPath.includes(symbol);
          });
          var details = getWildcardPropertyInChain(root, requiredPath, hasWildcard);
          if (!details.length) {
            shouldProcess = false;
            return {
              v: shouldProcess
            };
          }
          shouldProcess = !hasWildcard;
          for (var j = 0; j < details.length; j += 1) {
            var hasRequiredProp = typeof lastNestedPropName === "string" && details[j].base[lastNestedPropName] !== undefined;
            if (hasWildcard) {
              shouldProcess = hasRequiredProp || shouldProcess;
            } else {
              shouldProcess = hasRequiredProp && shouldProcess;
            }
          }
        };
        for (var i = 0; i < requiredPaths.length; i += 1) {
          var _ret = _loop();
          if (typeof _ret === "object") return _ret.v;
        }
        return shouldProcess;
      }