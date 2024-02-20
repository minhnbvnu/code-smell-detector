function getSourceMapDirectory(mapOptions, filePath, sourceFile) {
                if (mapOptions.sourceRoot)
                    return host.getCommonSourceDirectory();
                if (mapOptions.mapRoot) {
                    let sourceMapDir = normalizeSlashes(mapOptions.mapRoot);
                    if (sourceFile) {
                        sourceMapDir = getDirectoryPath(getSourceFilePathInNewDir(sourceFile.fileName, host, sourceMapDir));
                    }
                    if (getRootLength(sourceMapDir) === 0) {
                        sourceMapDir = combinePaths(host.getCommonSourceDirectory(), sourceMapDir);
                    }
                    return sourceMapDir;
                }
                return getDirectoryPath(normalizePath(filePath));
            }