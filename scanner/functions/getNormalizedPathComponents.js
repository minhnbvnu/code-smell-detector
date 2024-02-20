function getNormalizedPathComponents(path, currentDirectory) {
            return reducePathComponents(getPathComponents(path, currentDirectory));
        }