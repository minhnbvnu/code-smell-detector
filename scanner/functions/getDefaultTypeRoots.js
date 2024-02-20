function getDefaultTypeRoots(currentDirectory, host) {
            if (!host.directoryExists) {
                return [combinePaths(currentDirectory, nodeModulesAtTypes)];
            }
            let typeRoots;
            forEachAncestorDirectory(normalizePath(currentDirectory), (directory) => {
                const atTypes = combinePaths(directory, nodeModulesAtTypes);
                if (host.directoryExists(atTypes)) {
                    (typeRoots || (typeRoots = [])).push(atTypes);
                }
                return void 0;
            });
            return typeRoots;
        }