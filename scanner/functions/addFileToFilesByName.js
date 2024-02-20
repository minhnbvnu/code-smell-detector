function addFileToFilesByName(file, path, redirectedPath) {
                if (redirectedPath) {
                    filesByName.set(redirectedPath, file);
                    filesByName.set(path, file || false);
                }
                else {
                    filesByName.set(path, file);
                }
            }