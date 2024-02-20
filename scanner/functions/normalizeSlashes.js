function normalizeSlashes(path) {
            return path.indexOf("\\") !== -1 ? path.replace(backslashRegExp, directorySeparator) : path;
        }