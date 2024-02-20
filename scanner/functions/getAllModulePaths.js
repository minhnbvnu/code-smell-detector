function getAllModulePaths(importingFilePath, importedFileName, host, preferences, options = {}) {
            var _a2;
            const importedFilePath = toPath(importedFileName, host.getCurrentDirectory(), hostGetCanonicalFileName(host));
            const cache = (_a2 = host.getModuleSpecifierCache) == null ? void 0 : _a2.call(host);
            if (cache) {
                const cached = cache.get(importingFilePath, importedFilePath, preferences, options);
                if (cached == null ? void 0 : cached.modulePaths)
                    return cached.modulePaths;
            }
            const modulePaths = getAllModulePathsWorker(importingFilePath, importedFileName, host);
            if (cache) {
                cache.setModulePaths(importingFilePath, importedFilePath, preferences, options, modulePaths);
            }
            return modulePaths;
        }