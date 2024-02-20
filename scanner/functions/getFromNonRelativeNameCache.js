function getFromNonRelativeNameCache(nonRelativeModuleName, mode, directoryName, redirectedReference) {
                var _a2, _b;
                Debug.assert(!isExternalModuleNameRelative(nonRelativeModuleName));
                return (_b = (_a2 = moduleNameToDirectoryMap.getMapOfCacheRedirects(redirectedReference)) == null ? void 0 : _a2.get(createModeAwareCacheKey(nonRelativeModuleName, mode))) == null ? void 0 : _b.get(directoryName);
            }