function getBaseDirectoriesFromRootDirs(rootDirs, basePath, scriptDirectory, ignoreCase) {
            rootDirs = rootDirs.map((rootDirectory) => normalizePath(isRootedDiskPath(rootDirectory) ? rootDirectory : combinePaths(basePath, rootDirectory)));
            const relativeDirectory = firstDefined(rootDirs, (rootDirectory) => containsPath(rootDirectory, scriptDirectory, basePath, ignoreCase) ? scriptDirectory.substr(rootDirectory.length) : void 0);
            return deduplicate([...rootDirs.map((rootDirectory) => combinePaths(rootDirectory, relativeDirectory)), scriptDirectory], equateStringsCaseSensitive, compareStringsCaseSensitive);
        }