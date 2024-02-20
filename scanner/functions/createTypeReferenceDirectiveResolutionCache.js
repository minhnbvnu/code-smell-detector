function createTypeReferenceDirectiveResolutionCache(currentDirectory, getCanonicalFileName, options, packageJsonInfoCache) {
            return createModuleOrTypeReferenceResolutionCache(currentDirectory, getCanonicalFileName, options, packageJsonInfoCache, getOriginalOrResolvedTypeReferenceFileName);
        }