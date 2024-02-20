function disableCache(state) {
            if (!state.cache)
                return;
            const { cache, host, compilerHost, extendedConfigCache, moduleResolutionCache, typeReferenceDirectiveResolutionCache } = state;
            host.readFile = cache.originalReadFile;
            host.fileExists = cache.originalFileExists;
            host.directoryExists = cache.originalDirectoryExists;
            host.createDirectory = cache.originalCreateDirectory;
            host.writeFile = cache.originalWriteFile;
            compilerHost.getSourceFile = cache.originalGetSourceFile;
            state.readFileWithCache = cache.originalReadFileWithCache;
            extendedConfigCache.clear();
            moduleResolutionCache == null ? void 0 : moduleResolutionCache.clear();
            typeReferenceDirectiveResolutionCache == null ? void 0 : typeReferenceDirectiveResolutionCache.clear();
            state.cache = void 0;
        }