function resolveTypeReferenceDirective(typeReferenceDirectiveName, containingFile, options, host, redirectedReference, cache, resolutionMode) {
            Debug.assert(typeof typeReferenceDirectiveName === "string", "Non-string value passed to `ts.resolveTypeReferenceDirective`, likely by a wrapping package working with an outdated `resolveTypeReferenceDirectives` signature. This is probably not a problem in TS itself.");
            const traceEnabled = isTraceEnabled(options, host);
            if (redirectedReference) {
                options = redirectedReference.commandLine.options;
            }
            const containingDirectory = containingFile ? getDirectoryPath(containingFile) : void 0;
            let result = containingDirectory ? cache == null ? void 0 : cache.getFromDirectoryCache(typeReferenceDirectiveName, resolutionMode, containingDirectory, redirectedReference) : void 0;
            if (!result && containingDirectory && !isExternalModuleNameRelative(typeReferenceDirectiveName)) {
                result = cache == null ? void 0 : cache.getFromNonRelativeNameCache(typeReferenceDirectiveName, resolutionMode, containingDirectory, redirectedReference);
            }
            if (result) {
                if (traceEnabled) {
                    trace(host, Diagnostics.Resolving_type_reference_directive_0_containing_file_1, typeReferenceDirectiveName, containingFile);
                    if (redirectedReference)
                        trace(host, Diagnostics.Using_compiler_options_of_project_reference_redirect_0, redirectedReference.sourceFile.fileName);
                    trace(host, Diagnostics.Resolution_for_type_reference_directive_0_was_found_in_cache_from_location_1, typeReferenceDirectiveName, containingDirectory);
                    traceResult(result);
                }
                return result;
            }
            const typeRoots = getEffectiveTypeRoots(options, host);
            if (traceEnabled) {
                if (containingFile === void 0) {
                    if (typeRoots === void 0) {
                        trace(host, Diagnostics.Resolving_type_reference_directive_0_containing_file_not_set_root_directory_not_set, typeReferenceDirectiveName);
                    }
                    else {
                        trace(host, Diagnostics.Resolving_type_reference_directive_0_containing_file_not_set_root_directory_1, typeReferenceDirectiveName, typeRoots);
                    }
                }
                else {
                    if (typeRoots === void 0) {
                        trace(host, Diagnostics.Resolving_type_reference_directive_0_containing_file_1_root_directory_not_set, typeReferenceDirectiveName, containingFile);
                    }
                    else {
                        trace(host, Diagnostics.Resolving_type_reference_directive_0_containing_file_1_root_directory_2, typeReferenceDirectiveName, containingFile, typeRoots);
                    }
                }
                if (redirectedReference) {
                    trace(host, Diagnostics.Using_compiler_options_of_project_reference_redirect_0, redirectedReference.sourceFile.fileName);
                }
            }
            const failedLookupLocations = [];
            const affectingLocations = [];
            let features = getNodeResolutionFeatures(options);
            if (resolutionMode === 99 /* ESNext */ && (getEmitModuleResolutionKind(options) === 3 /* Node16 */ || getEmitModuleResolutionKind(options) === 99 /* NodeNext */)) {
                features |= 32 /* EsmMode */;
            }
            const conditions = features & 8 /* Exports */ ? getConditions(options, !!(features & 32 /* EsmMode */)) : [];
            const diagnostics = [];
            const moduleResolutionState = {
                compilerOptions: options,
                host,
                traceEnabled,
                failedLookupLocations,
                affectingLocations,
                packageJsonInfoCache: cache,
                features,
                conditions,
                requestContainingDirectory: containingDirectory,
                reportDiagnostic: (diag2) => void diagnostics.push(diag2),
                isConfigLookup: false,
                candidateIsFromPackageJsonField: false
            };
            let resolved = primaryLookup();
            let primary = true;
            if (!resolved) {
                resolved = secondaryLookup();
                primary = false;
            }
            let resolvedTypeReferenceDirective;
            if (resolved) {
                const { fileName, packageId } = resolved;
                let resolvedFileName = fileName, originalPath;
                if (!options.preserveSymlinks)
                    ({ resolvedFileName, originalPath } = getOriginalAndResolvedFileName(fileName, host, traceEnabled));
                resolvedTypeReferenceDirective = {
                    primary,
                    resolvedFileName,
                    originalPath,
                    packageId,
                    isExternalLibraryImport: pathContainsNodeModules(fileName)
                };
            }
            result = {
                resolvedTypeReferenceDirective,
                failedLookupLocations: initializeResolutionField(failedLookupLocations),
                affectingLocations: initializeResolutionField(affectingLocations),
                resolutionDiagnostics: initializeResolutionField(diagnostics)
            };
            if (containingDirectory) {
                cache == null ? void 0 : cache.getOrCreateCacheForDirectory(containingDirectory, redirectedReference).set(typeReferenceDirectiveName, 
                /*mode*/
                resolutionMode, result);
                if (!isExternalModuleNameRelative(typeReferenceDirectiveName)) {
                    cache == null ? void 0 : cache.getOrCreateCacheForNonRelativeName(typeReferenceDirectiveName, resolutionMode, redirectedReference).set(containingDirectory, result);
                }
            }
            if (traceEnabled)
                traceResult(result);
            return result;
            function traceResult(result2) {
                var _a2;
                if (!((_a2 = result2.resolvedTypeReferenceDirective) == null ? void 0 : _a2.resolvedFileName)) {
                    trace(host, Diagnostics.Type_reference_directive_0_was_not_resolved, typeReferenceDirectiveName);
                }
                else if (result2.resolvedTypeReferenceDirective.packageId) {
                    trace(host, Diagnostics.Type_reference_directive_0_was_successfully_resolved_to_1_with_Package_ID_2_primary_Colon_3, typeReferenceDirectiveName, result2.resolvedTypeReferenceDirective.resolvedFileName, packageIdToString(result2.resolvedTypeReferenceDirective.packageId), result2.resolvedTypeReferenceDirective.primary);
                }
                else {
                    trace(host, Diagnostics.Type_reference_directive_0_was_successfully_resolved_to_1_primary_Colon_2, typeReferenceDirectiveName, result2.resolvedTypeReferenceDirective.resolvedFileName, result2.resolvedTypeReferenceDirective.primary);
                }
            }
            function primaryLookup() {
                if (typeRoots && typeRoots.length) {
                    if (traceEnabled) {
                        trace(host, Diagnostics.Resolving_with_primary_search_path_0, typeRoots.join(", "));
                    }
                    return firstDefined(typeRoots, (typeRoot) => {
                        const candidate = combinePaths(typeRoot, typeReferenceDirectiveName);
                        const candidateDirectory = getDirectoryPath(candidate);
                        const directoryExists = directoryProbablyExists(candidateDirectory, host);
                        if (!directoryExists && traceEnabled) {
                            trace(host, Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, candidateDirectory);
                        }
                        return resolvedTypeScriptOnly(loadNodeModuleFromDirectory(4 /* Declaration */, candidate, !directoryExists, moduleResolutionState));
                    });
                }
                else {
                    if (traceEnabled) {
                        trace(host, Diagnostics.Root_directory_cannot_be_determined_skipping_primary_search_paths);
                    }
                }
            }
            function secondaryLookup() {
                const initialLocationForSecondaryLookup = containingFile && getDirectoryPath(containingFile);
                if (initialLocationForSecondaryLookup !== void 0) {
                    if (traceEnabled) {
                        trace(host, Diagnostics.Looking_up_in_node_modules_folder_initial_location_0, initialLocationForSecondaryLookup);
                    }
                    let result2;
                    if (!isExternalModuleNameRelative(typeReferenceDirectiveName)) {
                        const searchResult = loadModuleFromNearestNodeModulesDirectory(4 /* Declaration */, typeReferenceDirectiveName, initialLocationForSecondaryLookup, moduleResolutionState, 
                        /*cache*/
                        void 0, 
                        /*redirectedReference*/
                        void 0);
                        result2 = searchResult && searchResult.value;
                    }
                    else {
                        const { path: candidate } = normalizePathForCJSResolution(initialLocationForSecondaryLookup, typeReferenceDirectiveName);
                        result2 = nodeLoadModuleByRelativeName(4 /* Declaration */, candidate, 
                        /*onlyRecordFailures*/
                        false, moduleResolutionState, 
                        /*considerPackageJson*/
                        true);
                    }
                    return resolvedTypeScriptOnly(result2);
                }
                else {
                    if (traceEnabled) {
                        trace(host, Diagnostics.Containing_file_is_not_specified_and_root_directory_cannot_be_determined_skipping_lookup_in_node_modules_folder);
                    }
                }
            }
        }