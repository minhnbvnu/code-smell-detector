function getFromDirectoryCache(name, mode, directoryName, redirectedReference) {
                var _a2, _b;
                const path = toPath(directoryName, currentDirectory, getCanonicalFileName);
                return (_b = (_a2 = directoryToModuleNameMap.getMapOfCacheRedirects(redirectedReference)) == null ? void 0 : _a2.get(path)) == null ? void 0 : _b.get(name, mode);
            }