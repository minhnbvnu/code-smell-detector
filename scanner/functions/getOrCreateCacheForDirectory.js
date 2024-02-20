function getOrCreateCacheForDirectory(directoryName, redirectedReference) {
                const path = toPath(directoryName, currentDirectory, getCanonicalFileName);
                return getOrCreateCache(directoryToModuleNameMap, redirectedReference, path, () => createModeAwareCache());
            }