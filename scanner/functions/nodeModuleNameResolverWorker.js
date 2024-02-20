function nodeModuleNameResolverWorker(features, moduleName, containingDirectory, compilerOptions, host, cache, extensions, isConfigLookup, redirectedReference) {
            var _a2, _b, _c, _d;
            const traceEnabled = isTraceEnabled(compilerOptions, host);
            const failedLookupLocations = [];
            const affectingLocations = [];
            const conditions = getConditions(compilerOptions, !!(features & 32 /* EsmMode */));
            const diagnostics = [];
            const state = {
                compilerOptions,
                host,
                traceEnabled,
                failedLookupLocations,
                affectingLocations,
                packageJsonInfoCache: cache,
                features,
                conditions,
                requestContainingDirectory: containingDirectory,
                reportDiagnostic: (diag2) => void diagnostics.push(diag2),
                isConfigLookup,
                candidateIsFromPackageJsonField: false
            };
            if (traceEnabled && moduleResolutionSupportsPackageJsonExportsAndImports(getEmitModuleResolutionKind(compilerOptions))) {
                trace(host, Diagnostics.Resolving_in_0_mode_with_conditions_1, features & 32 /* EsmMode */ ? "ESM" : "CJS", conditions.map((c) => `'${c}'`).join(", "));
            }
            let result;
            if (getEmitModuleResolutionKind(compilerOptions) === 2 /* Node10 */) {
                const priorityExtensions = extensions & (1 /* TypeScript */ | 4 /* Declaration */);
                const secondaryExtensions = extensions & ~(1 /* TypeScript */ | 4 /* Declaration */);
                result = priorityExtensions && tryResolve(priorityExtensions, state) || secondaryExtensions && tryResolve(secondaryExtensions, state) || void 0;
            }
            else {
                result = tryResolve(extensions, state);
            }
            let legacyResult;
            if (((_a2 = result == null ? void 0 : result.value) == null ? void 0 : _a2.isExternalLibraryImport) && !isConfigLookup && extensions & (1 /* TypeScript */ | 4 /* Declaration */) && features & 8 /* Exports */ && !isExternalModuleNameRelative(moduleName) && !extensionIsOk(1 /* TypeScript */ | 4 /* Declaration */, result.value.resolved.extension) && conditions.indexOf("import") > -1) {
                traceIfEnabled(state, Diagnostics.Resolution_of_non_relative_name_failed_trying_with_modern_Node_resolution_features_disabled_to_see_if_npm_library_needs_configuration_update);
                const diagnosticState = {
                    ...state,
                    features: state.features & ~8 /* Exports */,
                    failedLookupLocations: [],
                    affectingLocations: [],
                    reportDiagnostic: noop
                };
                const diagnosticResult = tryResolve(extensions & (1 /* TypeScript */ | 4 /* Declaration */), diagnosticState);
                if ((_b = diagnosticResult == null ? void 0 : diagnosticResult.value) == null ? void 0 : _b.isExternalLibraryImport) {
                    legacyResult = diagnosticResult.value.resolved.path;
                }
            }
            return createResolvedModuleWithFailedLookupLocationsHandlingSymlink(moduleName, (_c = result == null ? void 0 : result.value) == null ? void 0 : _c.resolved, (_d = result == null ? void 0 : result.value) == null ? void 0 : _d.isExternalLibraryImport, failedLookupLocations, affectingLocations, diagnostics, state, legacyResult);
            function tryResolve(extensions2, state2) {
                const loader = (extensions3, candidate, onlyRecordFailures, state3) => nodeLoadModuleByRelativeName(extensions3, candidate, onlyRecordFailures, state3, 
                /*considerPackageJson*/
                true);
                const resolved = tryLoadModuleUsingOptionalResolutionSettings(extensions2, moduleName, containingDirectory, loader, state2);
                if (resolved) {
                    return toSearchResult({ resolved, isExternalLibraryImport: pathContainsNodeModules(resolved.path) });
                }
                if (!isExternalModuleNameRelative(moduleName)) {
                    let resolved2;
                    if (features & 2 /* Imports */ && startsWith(moduleName, "#")) {
                        resolved2 = loadModuleFromImports(extensions2, moduleName, containingDirectory, state2, cache, redirectedReference);
                    }
                    if (!resolved2 && features & 4 /* SelfName */) {
                        resolved2 = loadModuleFromSelfNameReference(extensions2, moduleName, containingDirectory, state2, cache, redirectedReference);
                    }
                    if (!resolved2) {
                        if (traceEnabled) {
                            trace(host, Diagnostics.Loading_module_0_from_node_modules_folder_target_file_types_Colon_1, moduleName, formatExtensions(extensions2));
                        }
                        resolved2 = loadModuleFromNearestNodeModulesDirectory(extensions2, moduleName, containingDirectory, state2, cache, redirectedReference);
                    }
                    return resolved2 && { value: resolved2.value && { resolved: resolved2.value, isExternalLibraryImport: true } };
                }
                else {
                    const { path: candidate, parts } = normalizePathForCJSResolution(containingDirectory, moduleName);
                    const resolved2 = nodeLoadModuleByRelativeName(extensions2, candidate, 
                    /*onlyRecordFailures*/
                    false, state2, 
                    /*considerPackageJson*/
                    true);
                    return resolved2 && toSearchResult({ resolved: resolved2, isExternalLibraryImport: contains(parts, "node_modules") });
                }
            }
        }