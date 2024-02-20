function convertToRelativePath(absoluteOrRelativePath, basePath, getCanonicalFileName) {
            return !isRootedDiskPath(absoluteOrRelativePath) ? absoluteOrRelativePath : getRelativePathToDirectoryOrUrl(basePath, absoluteOrRelativePath, basePath, getCanonicalFileName, 
            /*isAbsolutePathAnUrl*/
            false);
        }