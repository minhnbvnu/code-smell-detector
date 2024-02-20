function startCachingPerDirectoryResolution() {
                moduleResolutionCache.clearAllExceptPackageJsonInfoCache();
                typeReferenceDirectiveResolutionCache.clearAllExceptPackageJsonInfoCache();
                nonRelativeExternalModuleResolutions.forEach(watchFailedLookupLocationOfNonRelativeModuleResolutions);
                nonRelativeExternalModuleResolutions.clear();
            }