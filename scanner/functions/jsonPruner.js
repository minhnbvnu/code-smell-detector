function jsonPruner(source, root, prunePaths, requiredPaths, stack, nativeObjects) {
        var nativeStringify = nativeObjects.nativeStringify;
        if (prunePaths.length === 0 && requiredPaths.length === 0) {
          logMessage(source, "".concat(window.location.hostname, "\n").concat(nativeStringify(root, null, 2), "\nStack trace:\n").concat(new Error().stack), true);
          if (root && typeof root === "object") {
            logMessage(source, root, true, false);
          }
          return root;
        }
        try {
          if (isPruningNeeded(source, root, prunePaths, requiredPaths, stack, nativeObjects) === false) {
            return root;
          }
          prunePaths.forEach(function (path) {
            var ownerObjArr = getWildcardPropertyInChain(root, path, true);
            ownerObjArr.forEach(function (ownerObj) {
              if (ownerObj !== undefined && ownerObj.base) {
                delete ownerObj.base[ownerObj.prop];
                hit(source);
              }
            });
          });
        } catch (e) {
          logMessage(source, e);
        }
        return root;
      }