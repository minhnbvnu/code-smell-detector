function loadModuleFromNearestNodeModulesDirectoryWorker(extensions, moduleName, directory, state, typesScopeOnly, cache, redirectedReference) {
            const mode = state.features === 0 ? void 0 : state.features & 32 /* EsmMode */ ? 99 /* ESNext */ : 1 /* CommonJS */;
            const priorityExtensions = extensions & (1 /* TypeScript */ | 4 /* Declaration */);
            const secondaryExtensions = extensions & ~(1 /* TypeScript */ | 4 /* Declaration */);
            if (priorityExtensions) {
                const result = lookup(priorityExtensions);
                if (result)
                    return result;
            }
            if (secondaryExtensions && !typesScopeOnly) {
                return lookup(secondaryExtensions);
            }
            function lookup(extensions2) {
                return forEachAncestorDirectory(normalizeSlashes(directory), (ancestorDirectory) => {
                    if (getBaseFileName(ancestorDirectory) !== "node_modules") {
                        const resolutionFromCache = tryFindNonRelativeModuleNameInCache(cache, moduleName, mode, ancestorDirectory, redirectedReference, state);
                        if (resolutionFromCache) {
                            return resolutionFromCache;
                        }
                        return toSearchResult(loadModuleFromImmediateNodeModulesDirectory(extensions2, moduleName, ancestorDirectory, state, typesScopeOnly, cache, redirectedReference));
                    }
                });
            }
        }