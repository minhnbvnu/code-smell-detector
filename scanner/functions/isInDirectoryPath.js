function isInDirectoryPath(dir, file) {
                if (dir === void 0 || file.length <= dir.length) {
                    return false;
                }
                return startsWith(file, dir) && file[dir.length] === directorySeparator;
            }