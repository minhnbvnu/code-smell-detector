function getCommonAncestorPath(sourcePaths) {
        let result = sourcePaths[0];
        for (let i = 1; i < sourcePaths.length; ++i) {
            const a = result;
            const b = sourcePaths[i];
            // Set the shorter one (it's the common ancestor if one includes the other).
            result = a.length < b.length ? a : b;
            // Set the common ancestor.
            for (let j = 0, lastSepPos = 0; j < a.length && j < b.length; ++j) {
                if (a[j] !== b[j]) {
                    result = a.slice(0, lastSepPos);
                    break;
                }
                if (a[j] === path__default["default"].sep) {
                    lastSepPos = j;
                }
            }
        }
        let resolvedResult = result || path__default["default"].sep;
        // if Windows common ancestor is root of drive must have trailing slash to be absolute.
        if (resolvedResult && resolvedResult.endsWith(":") && process.platform === "win32") {
            resolvedResult += path__default["default"].sep;
        }
        return resolvedResult;
    }