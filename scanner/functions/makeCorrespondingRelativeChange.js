function makeCorrespondingRelativeChange(a0, b0, a1, getCanonicalFileName) {
            const rel = getRelativePathFromFile(a0, b0, getCanonicalFileName);
            return combinePathsSafe(getDirectoryPath(a1), rel);
        }