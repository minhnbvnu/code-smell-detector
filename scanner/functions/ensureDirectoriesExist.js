function ensureDirectoriesExist(directoryPath, createDirectory, directoryExists) {
            if (directoryPath.length > getRootLength(directoryPath) && !directoryExists(directoryPath)) {
                const parentDirectory = getDirectoryPath(directoryPath);
                ensureDirectoriesExist(parentDirectory, createDirectory, directoryExists);
                createDirectory(directoryPath);
            }
        }