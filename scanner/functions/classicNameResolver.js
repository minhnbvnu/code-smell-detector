function classicNameResolver(moduleName, containingFile, compilerOptions, host, cache, redirectedReference) {
            const traceEnabled = isTraceEnabled(compilerOptions, host);
            const failedLookupLocations = [];
            const affectingLocations = [];
            const containingDirectory = getDirectoryPath(containingFile);
            const diagnostics = [];
            const state = {
                compilerOptions,
                host,
                traceEnabled,
                failedLookupLocations,
                affectingLocations,
                packageJsonInfoCache: cache,
                features: 0 /* None */,
                conditions: [],
                requestContainingDirectory: containingDirectory,
                reportDiagnostic: (diag2) => void diagnostics.push(diag2),
                isConfigLookup: false,
                candidateIsFromPackageJsonField: false
            };
            const resolved = tryResolve(1 /* TypeScript */ | 4 /* Declaration */) || tryResolve(2 /* JavaScript */ | (compilerOptions.resolveJsonModule ? 8 /* Json */ : 0));
            return createResolvedModuleWithFailedLookupLocationsHandlingSymlink(moduleName, resolved && resolved.value, (resolved == null ? void 0 : resolved.value) && pathContainsNodeModules(resolved.value.path), failedLookupLocations, affectingLocations, diagnostics, state);
            function tryResolve(extensions) {
                const resolvedUsingSettings = tryLoadModuleUsingOptionalResolutionSettings(extensions, moduleName, containingDirectory, loadModuleFromFileNoPackageId, state);
                if (resolvedUsingSettings) {
                    return { value: resolvedUsingSettings };
                }
                if (!isExternalModuleNameRelative(moduleName)) {
                    const resolved2 = forEachAncestorDirectory(containingDirectory, (directory) => {
                        const resolutionFromCache = tryFindNonRelativeModuleNameInCache(cache, moduleName, 
                        /*mode*/
                        void 0, directory, redirectedReference, state);
                        if (resolutionFromCache) {
                            return resolutionFromCache;
                        }
                        const searchName = normalizePath(combinePaths(directory, moduleName));
                        return toSearchResult(loadModuleFromFileNoPackageId(extensions, searchName, 
                        /*onlyRecordFailures*/
                        false, state));
                    });
                    if (resolved2) {
                        return resolved2;
                    }
                    if (extensions & (1 /* TypeScript */ | 4 /* Declaration */)) {
                        return loadModuleFromNearestNodeModulesDirectoryTypesScope(moduleName, containingDirectory, state);
                    }
                }
                else {
                    const candidate = normalizePath(combinePaths(containingDirectory, moduleName));
                    return toSearchResult(loadModuleFromFileNoPackageId(extensions, candidate, 
                    /*onlyRecordFailures*/
                    false, state));
                }
            }
        }