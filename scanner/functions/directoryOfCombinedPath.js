function directoryOfCombinedPath(fileName, basePath) {
            return getDirectoryPath(getNormalizedAbsolutePath(fileName, basePath));
        }