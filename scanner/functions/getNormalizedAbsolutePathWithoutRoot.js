function getNormalizedAbsolutePathWithoutRoot(fileName, currentDirectory) {
            return getPathWithoutRoot(getNormalizedPathComponents(fileName, currentDirectory));
        }