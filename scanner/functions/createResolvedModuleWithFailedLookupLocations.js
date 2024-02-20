function createResolvedModuleWithFailedLookupLocations(resolved, isExternalLibraryImport, failedLookupLocations, affectingLocations, diagnostics, resultFromCache, legacyResult) {
            if (resultFromCache) {
                resultFromCache.failedLookupLocations = updateResolutionField(resultFromCache.failedLookupLocations, failedLookupLocations);
                resultFromCache.affectingLocations = updateResolutionField(resultFromCache.affectingLocations, affectingLocations);
                resultFromCache.resolutionDiagnostics = updateResolutionField(resultFromCache.resolutionDiagnostics, diagnostics);
                return resultFromCache;
            }
            return {
                resolvedModule: resolved && {
                    resolvedFileName: resolved.path,
                    originalPath: resolved.originalPath === true ? void 0 : resolved.originalPath,
                    extension: resolved.extension,
                    isExternalLibraryImport,
                    packageId: resolved.packageId,
                    resolvedUsingTsExtension: !!resolved.resolvedUsingTsExtension
                },
                failedLookupLocations: initializeResolutionField(failedLookupLocations),
                affectingLocations: initializeResolutionField(affectingLocations),
                resolutionDiagnostics: initializeResolutionField(diagnostics),
                node10Result: legacyResult
            };
        }