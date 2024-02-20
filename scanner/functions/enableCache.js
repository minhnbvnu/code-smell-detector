function enableCache(state) {
            if (state.cache) {
                disableCache(state);
            }
            const { compilerHost, host } = state;
            const originalReadFileWithCache = state.readFileWithCache;
            const originalGetSourceFile = compilerHost.getSourceFile;
            const { originalReadFile, originalFileExists, originalDirectoryExists, originalCreateDirectory, originalWriteFile, getSourceFileWithCache, readFileWithCache } = changeCompilerHostLikeToUseCache(host, (fileName) => toPath2(state, fileName), (...args) => originalGetSourceFile.call(compilerHost, ...args));
            state.readFileWithCache = readFileWithCache;
            compilerHost.getSourceFile = getSourceFileWithCache;
            state.cache = {
                originalReadFile,
                originalFileExists,
                originalDirectoryExists,
                originalCreateDirectory,
                originalWriteFile,
                originalReadFileWithCache,
                originalGetSourceFile
            };
        }