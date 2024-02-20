function resolveTripleslashReference(moduleName, containingFile) {
            const basePath = getDirectoryPath(containingFile);
            const referencedFileName = isRootedDiskPath(moduleName) ? moduleName : combinePaths(basePath, moduleName);
            return normalizePath(referencedFileName);
        }