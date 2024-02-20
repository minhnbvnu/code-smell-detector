function loadModuleFromGlobalCache(moduleName, projectName, compilerOptions, host, globalCache, packageJsonInfoCache) {
            const traceEnabled = isTraceEnabled(compilerOptions, host);
            if (traceEnabled) {
                trace(host, Diagnostics.Auto_discovery_for_typings_is_enabled_in_project_0_Running_extra_resolution_pass_for_module_1_using_cache_location_2, projectName, moduleName, globalCache);
            }
            const failedLookupLocations = [];
            const affectingLocations = [];
            const diagnostics = [];
            const state = {
                compilerOptions,
                host,
                traceEnabled,
                failedLookupLocations,
                affectingLocations,
                packageJsonInfoCache,
                features: 0 /* None */,
                conditions: [],
                requestContainingDirectory: void 0,
                reportDiagnostic: (diag2) => void diagnostics.push(diag2),
                isConfigLookup: false,
                candidateIsFromPackageJsonField: false
            };
            const resolved = loadModuleFromImmediateNodeModulesDirectory(4 /* Declaration */, moduleName, globalCache, state, 
            /*typesScopeOnly*/
            false, 
            /*cache*/
            void 0, 
            /*redirectedReference*/
            void 0);
            return createResolvedModuleWithFailedLookupLocations(resolved, 
            /*isExternalLibraryImport*/
            true, failedLookupLocations, affectingLocations, diagnostics, state.resultFromCache);
        }