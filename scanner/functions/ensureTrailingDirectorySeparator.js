function ensureTrailingDirectorySeparator(path) {
            if (!hasTrailingDirectorySeparator(path)) {
                return path + directorySeparator;
            }
            return path;
        }