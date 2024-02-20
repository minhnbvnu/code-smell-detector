function combinePathsSafe(pathA, pathB) {
            return ensurePathIsNonModuleName(combineNormal(pathA, pathB));
        }