function tryGetModuleSpecifiersFromCacheWorker(moduleSymbol, importingSourceFile, host, userPreferences, options = {}) {
            var _a2;
            const moduleSourceFile = getSourceFileOfModule(moduleSymbol);
            if (!moduleSourceFile) {
                return emptyArray;
            }
            const cache = (_a2 = host.getModuleSpecifierCache) == null ? void 0 : _a2.call(host);
            const cached = cache == null ? void 0 : cache.get(importingSourceFile.path, moduleSourceFile.path, userPreferences, options);
            return [cached == null ? void 0 : cached.moduleSpecifiers, moduleSourceFile, cached == null ? void 0 : cached.modulePaths, cache];
        }