function directoryExistsForTypeRootWatch(nodeTypesDirectory) {
                const dir = getDirectoryPath(getDirectoryPath(nodeTypesDirectory));
                const dirPath = resolutionHost.toPath(dir);
                return dirPath === rootPath || canWatchDirectoryOrFile(dirPath);
            }