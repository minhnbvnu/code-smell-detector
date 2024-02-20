function hasTrailingDirectorySeparator(path) {
            return path.length > 0 && isAnyDirectorySeparator(path.charCodeAt(path.length - 1));
        }