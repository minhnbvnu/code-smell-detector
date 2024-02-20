function ensurePathIsNonModuleName(path) {
            return !pathIsAbsolute(path) && !pathIsRelative(path) ? "./" + path : path;
        }