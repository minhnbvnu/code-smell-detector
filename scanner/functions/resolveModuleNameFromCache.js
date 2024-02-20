function resolveModuleNameFromCache(moduleName, containingFile, cache, mode) {
            const containingDirectory = getDirectoryPath(containingFile);
            return cache.getFromDirectoryCache(moduleName, mode, containingDirectory, 
            /*redirectedReference*/
            void 0);
        }