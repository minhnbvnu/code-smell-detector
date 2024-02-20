function findConfigFile(searchPath, fileExists, configName = "tsconfig.json") {
            return forEachAncestorDirectory(searchPath, (ancestor) => {
                const fileName = combinePaths(ancestor, configName);
                return fileExists(fileName) ? fileName : void 0;
            });
        }