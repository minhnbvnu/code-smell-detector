function getRelativePathIfInDirectory(path, directoryPath, getCanonicalFileName) {
            const relativePath = getRelativePathToDirectoryOrUrl(directoryPath, path, directoryPath, getCanonicalFileName, 
            /*isAbsolutePathAnUrl*/
            false);
            return isRootedDiskPath(relativePath) ? void 0 : relativePath;
        }