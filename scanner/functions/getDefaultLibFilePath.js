function getDefaultLibFilePath(options) {
            if (sys) {
                return combinePaths(getDirectoryPath(normalizePath(sys.getExecutingFilePath())), getDefaultLibFileName(options));
            }
            throw new Error("getDefaultLibFilePath is only supported when consumed as a node module. ");
        }