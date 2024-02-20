function createPerDirectoryResolutionCache(currentDirectory, getCanonicalFileName, options) {
            const directoryToModuleNameMap = createCacheWithRedirects(options);
            return {
                getFromDirectoryCache,
                getOrCreateCacheForDirectory,
                clear: clear2,
                update
            };
            function clear2() {
                directoryToModuleNameMap.clear();
            }
            function update(options2) {
                directoryToModuleNameMap.update(options2);
            }
            function getOrCreateCacheForDirectory(directoryName, redirectedReference) {
                const path = toPath(directoryName, currentDirectory, getCanonicalFileName);
                return getOrCreateCache(directoryToModuleNameMap, redirectedReference, path, () => createModeAwareCache());
            }
            function getFromDirectoryCache(name, mode, directoryName, redirectedReference) {
                var _a2, _b;
                const path = toPath(directoryName, currentDirectory, getCanonicalFileName);
                return (_b = (_a2 = directoryToModuleNameMap.getMapOfCacheRedirects(redirectedReference)) == null ? void 0 : _a2.get(path)) == null ? void 0 : _b.get(name, mode);
            }
        }