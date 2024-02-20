function createModuleResolutionCache(currentDirectory, getCanonicalFileName, options) {
            const result = createModuleOrTypeReferenceResolutionCache(currentDirectory, getCanonicalFileName, options, 
            /*packageJsonInfoCache*/
            void 0, getOriginalOrResolvedModuleFileName);
            result.getOrCreateCacheForModuleName = (nonRelativeName, mode, redirectedReference) => result.getOrCreateCacheForNonRelativeName(nonRelativeName, mode, redirectedReference);
            return result;
        }