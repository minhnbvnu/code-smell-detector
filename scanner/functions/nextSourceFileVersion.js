function nextSourceFileVersion(path) {
                const hostSourceFile = sourceFilesCache.get(path);
                if (hostSourceFile !== void 0) {
                    if (isFileMissingOnHost(hostSourceFile)) {
                        sourceFilesCache.set(path, { version: false });
                    }
                    else {
                        hostSourceFile.version = false;
                    }
                }
            }