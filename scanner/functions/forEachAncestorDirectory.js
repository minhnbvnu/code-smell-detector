function forEachAncestorDirectory(directory, callback) {
            while (true) {
                const result = callback(directory);
                if (result !== void 0) {
                    return result;
                }
                const parentPath = getDirectoryPath(directory);
                if (parentPath === directory) {
                    return void 0;
                }
                directory = parentPath;
            }
        }