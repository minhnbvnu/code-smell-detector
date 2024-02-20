function combinePaths(path, ...paths) {
            if (path)
                path = normalizeSlashes(path);
            for (let relativePath of paths) {
                if (!relativePath)
                    continue;
                relativePath = normalizeSlashes(relativePath);
                if (!path || getRootLength(relativePath) !== 0) {
                    path = relativePath;
                }
                else {
                    path = ensureTrailingDirectorySeparator(path) + relativePath;
                }
            }
            return path;
        }