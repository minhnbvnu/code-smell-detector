function createModuleOrTypeReferenceResolutionCache(currentDirectory, getCanonicalFileName, options, packageJsonInfoCache, getResolvedFileName) {
            const perDirectoryResolutionCache = createPerDirectoryResolutionCache(currentDirectory, getCanonicalFileName, options);
            const nonRelativeNameResolutionCache = createNonRelativeNameResolutionCache(currentDirectory, getCanonicalFileName, options, getResolvedFileName);
            packageJsonInfoCache != null ? packageJsonInfoCache : packageJsonInfoCache = createPackageJsonInfoCache(currentDirectory, getCanonicalFileName);
            return {
                ...packageJsonInfoCache,
                ...perDirectoryResolutionCache,
                ...nonRelativeNameResolutionCache,
                clear: clear2,
                update,
                getPackageJsonInfoCache: () => packageJsonInfoCache,
                clearAllExceptPackageJsonInfoCache
            };
            function clear2() {
                clearAllExceptPackageJsonInfoCache();
                packageJsonInfoCache.clear();
            }
            function clearAllExceptPackageJsonInfoCache() {
                perDirectoryResolutionCache.clear();
                nonRelativeNameResolutionCache.clear();
            }
            function update(options2) {
                perDirectoryResolutionCache.update(options2);
                nonRelativeNameResolutionCache.update(options2);
            }
        }