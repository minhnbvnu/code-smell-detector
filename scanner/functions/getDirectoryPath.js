function getDirectoryPath(path) {
            path = normalizeSlashes(path);
            const rootLength = getRootLength(path);
            if (rootLength === path.length)
                return path;
            path = removeTrailingDirectorySeparator(path);
            return path.slice(0, Math.max(rootLength, path.lastIndexOf(directorySeparator)));
        }