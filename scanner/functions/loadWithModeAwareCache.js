function loadWithModeAwareCache(entries, containingFile, redirectedReference, options, containingSourceFile, host, resolutionCache, createLoader) {
            if (entries.length === 0)
                return emptyArray;
            const resolutions = [];
            const cache = /* @__PURE__ */ new Map();
            const loader = createLoader(containingFile, redirectedReference, options, host, resolutionCache);
            for (const entry of entries) {
                const name = loader.nameAndMode.getName(entry);
                const mode = loader.nameAndMode.getMode(entry, containingSourceFile);
                const key = createModeAwareCacheKey(name, mode);
                let result = cache.get(key);
                if (!result) {
                    cache.set(key, result = loader.resolve(name, mode));
                }
                resolutions.push(result);
            }
            return resolutions;
        }