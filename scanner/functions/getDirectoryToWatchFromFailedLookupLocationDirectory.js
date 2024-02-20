function getDirectoryToWatchFromFailedLookupLocationDirectory(dir, dirPath) {
                while (pathContainsNodeModules(dirPath)) {
                    dir = getDirectoryPath(dir);
                    dirPath = getDirectoryPath(dirPath);
                }
                if (isNodeModulesDirectory(dirPath)) {
                    return canWatchDirectoryOrFile(getDirectoryPath(dirPath)) ? { dir, dirPath } : void 0;
                }
                let nonRecursive = true;
                let subDirectoryPath, subDirectory;
                if (rootPath !== void 0) {
                    while (!isInDirectoryPath(dirPath, rootPath)) {
                        const parentPath = getDirectoryPath(dirPath);
                        if (parentPath === dirPath) {
                            break;
                        }
                        nonRecursive = false;
                        subDirectoryPath = dirPath;
                        subDirectory = dir;
                        dirPath = parentPath;
                        dir = getDirectoryPath(dir);
                    }
                }
                return canWatchDirectoryOrFile(dirPath) ? { dir: subDirectory || dir, dirPath: subDirectoryPath || dirPath, nonRecursive } : void 0;
            }