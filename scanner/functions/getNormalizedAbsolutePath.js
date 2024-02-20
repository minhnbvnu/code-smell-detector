function getNormalizedAbsolutePath(fileName, currentDirectory) {
            return getPathFromPathComponents(getNormalizedPathComponents(fileName, currentDirectory));
        }