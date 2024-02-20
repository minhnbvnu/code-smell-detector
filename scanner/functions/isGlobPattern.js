function isGlobPattern(pattern) {
        return isGlob(path.sep === "\\" ? normalizeToPosix(pattern) : pattern);
    }