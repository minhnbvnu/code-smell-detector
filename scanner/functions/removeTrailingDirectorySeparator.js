function removeTrailingDirectorySeparator(path) {
            if (hasTrailingDirectorySeparator(path)) {
                return path.substr(0, path.length - 1);
            }
            return path;
        }