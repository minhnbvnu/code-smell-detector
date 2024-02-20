function createResolvedModuleWithFailedLookupLocationsHandlingSymlink(moduleName, resolved, isExternalLibraryImport, failedLookupLocations, affectingLocations, diagnostics, state, legacyResult) {
            if (!state.resultFromCache && !state.compilerOptions.preserveSymlinks && resolved && isExternalLibraryImport && !resolved.originalPath && !isExternalModuleNameRelative(moduleName)) {
                const { resolvedFileName, originalPath } = getOriginalAndResolvedFileName(resolved.path, state.host, state.traceEnabled);
                if (originalPath)
                    resolved = { ...resolved, path: resolvedFileName, originalPath };
            }
            return createResolvedModuleWithFailedLookupLocations(resolved, isExternalLibraryImport, failedLookupLocations, affectingLocations, diagnostics, state.resultFromCache, legacyResult);
        }