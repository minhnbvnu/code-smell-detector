function getSourceMappingURL(mapOptions, sourceMapGenerator, filePath, sourceMapFilePath, sourceFile) {
                if (mapOptions.inlineSourceMap) {
                    const sourceMapText = sourceMapGenerator.toString();
                    const base64SourceMapText = base64encode(sys, sourceMapText);
                    return `data:application/json;base64,${base64SourceMapText}`;
                }
                const sourceMapFile = getBaseFileName(normalizeSlashes(Debug.checkDefined(sourceMapFilePath)));
                if (mapOptions.mapRoot) {
                    let sourceMapDir = normalizeSlashes(mapOptions.mapRoot);
                    if (sourceFile) {
                        sourceMapDir = getDirectoryPath(getSourceFilePathInNewDir(sourceFile.fileName, host, sourceMapDir));
                    }
                    if (getRootLength(sourceMapDir) === 0) {
                        sourceMapDir = combinePaths(host.getCommonSourceDirectory(), sourceMapDir);
                        return encodeURI(getRelativePathToDirectoryOrUrl(getDirectoryPath(normalizePath(filePath)), 
                        // get the relative sourceMapDir path based on jsFilePath
                        combinePaths(sourceMapDir, sourceMapFile), 
                        // this is where user expects to see sourceMap
                        host.getCurrentDirectory(), host.getCanonicalFileName, 
                        /*isAbsolutePathAnUrl*/
                        true));
                    }
                    else {
                        return encodeURI(combinePaths(sourceMapDir, sourceMapFile));
                    }
                }
                return encodeURI(sourceMapFile);
            }