function convertWindowsPath(aPath) {
        return pathLib.sep === "\\" ? aPath.replace(/\\/g, "/").replace(/^[a-z]:\/?/i, "/") : aPath;
    }