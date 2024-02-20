function dirSuffix(filePath) {
        const isDir = (filePath.endsWith(path__default["default"].sep) ||
            (process.platform === "win32" && filePath.endsWith("/")));
        return isDir ? "/" : "";
    }