function getAllModulePathsWorker(importingFileName, importedFileName, host) {
            const getCanonicalFileName = hostGetCanonicalFileName(host);
            const allFileNames = /* @__PURE__ */ new Map();
            let importedFileFromNodeModules = false;
            forEachFileNameOfModule(importingFileName, importedFileName, host, 
            /*preferSymlinks*/
            true, (path, isRedirect) => {
                const isInNodeModules = pathContainsNodeModules(path);
                allFileNames.set(path, { path: getCanonicalFileName(path), isRedirect, isInNodeModules });
                importedFileFromNodeModules = importedFileFromNodeModules || isInNodeModules;
            });
            const sortedPaths = [];
            for (let directory = getDirectoryPath(importingFileName); allFileNames.size !== 0;) {
                const directoryStart = ensureTrailingDirectorySeparator(directory);
                let pathsInDirectory;
                allFileNames.forEach(({ path, isRedirect, isInNodeModules }, fileName) => {
                    if (startsWith(path, directoryStart)) {
                        (pathsInDirectory || (pathsInDirectory = [])).push({ path: fileName, isRedirect, isInNodeModules });
                        allFileNames.delete(fileName);
                    }
                });
                if (pathsInDirectory) {
                    if (pathsInDirectory.length > 1) {
                        pathsInDirectory.sort(comparePathsByRedirectAndNumberOfDirectorySeparators);
                    }
                    sortedPaths.push(...pathsInDirectory);
                }
                const newDirectory = getDirectoryPath(directory);
                if (newDirectory === directory)
                    break;
                directory = newDirectory;
            }
            if (allFileNames.size) {
                const remainingPaths = arrayFrom(allFileNames.values());
                if (remainingPaths.length > 1)
                    remainingPaths.sort(comparePathsByRedirectAndNumberOfDirectorySeparators);
                sortedPaths.push(...remainingPaths);
            }
            return sortedPaths;
        }