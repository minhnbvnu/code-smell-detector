function getOrCreateCacheForNonRelativeName(nonRelativeModuleName, mode, redirectedReference) {
                Debug.assert(!isExternalModuleNameRelative(nonRelativeModuleName));
                return getOrCreateCache(moduleNameToDirectoryMap, redirectedReference, createModeAwareCacheKey(nonRelativeModuleName, mode), createPerModuleNameCache);
            }