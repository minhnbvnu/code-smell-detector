function getLoadModuleFromTargetImportOrExport(extensions, state, cache, redirectedReference, moduleName, scope, isImports) {
            function loadModuleFromTargetImportOrExport(target, subpath, pattern, key) {
                if (typeof target === "string") {
                    if (!pattern && subpath.length > 0 && !endsWith(target, "/")) {
                        if (state.traceEnabled) {
                            trace(state.host, Diagnostics.package_json_scope_0_has_invalid_type_for_target_of_specifier_1, scope.packageDirectory, moduleName);
                        }
                        return toSearchResult(
                        /*value*/
                        void 0);
                    }
                    if (!startsWith(target, "./")) {
                        if (isImports && !startsWith(target, "../") && !startsWith(target, "/") && !isRootedDiskPath(target)) {
                            const combinedLookup = pattern ? target.replace(/\*/g, subpath) : target + subpath;
                            traceIfEnabled(state, Diagnostics.Using_0_subpath_1_with_target_2, "imports", key, combinedLookup);
                            traceIfEnabled(state, Diagnostics.Resolving_module_0_from_1, combinedLookup, scope.packageDirectory + "/");
                            const result = nodeModuleNameResolverWorker(state.features, combinedLookup, scope.packageDirectory + "/", state.compilerOptions, state.host, cache, extensions, 
                            /*isConfigLookup*/
                            false, redirectedReference);
                            return toSearchResult(result.resolvedModule ? {
                                path: result.resolvedModule.resolvedFileName,
                                extension: result.resolvedModule.extension,
                                packageId: result.resolvedModule.packageId,
                                originalPath: result.resolvedModule.originalPath,
                                resolvedUsingTsExtension: result.resolvedModule.resolvedUsingTsExtension
                            } : void 0);
                        }
                        if (state.traceEnabled) {
                            trace(state.host, Diagnostics.package_json_scope_0_has_invalid_type_for_target_of_specifier_1, scope.packageDirectory, moduleName);
                        }
                        return toSearchResult(
                        /*value*/
                        void 0);
                    }
                    const parts = pathIsRelative(target) ? getPathComponents(target).slice(1) : getPathComponents(target);
                    const partsAfterFirst = parts.slice(1);
                    if (partsAfterFirst.indexOf("..") >= 0 || partsAfterFirst.indexOf(".") >= 0 || partsAfterFirst.indexOf("node_modules") >= 0) {
                        if (state.traceEnabled) {
                            trace(state.host, Diagnostics.package_json_scope_0_has_invalid_type_for_target_of_specifier_1, scope.packageDirectory, moduleName);
                        }
                        return toSearchResult(
                        /*value*/
                        void 0);
                    }
                    const resolvedTarget = combinePaths(scope.packageDirectory, target);
                    const subpathParts = getPathComponents(subpath);
                    if (subpathParts.indexOf("..") >= 0 || subpathParts.indexOf(".") >= 0 || subpathParts.indexOf("node_modules") >= 0) {
                        if (state.traceEnabled) {
                            trace(state.host, Diagnostics.package_json_scope_0_has_invalid_type_for_target_of_specifier_1, scope.packageDirectory, moduleName);
                        }
                        return toSearchResult(
                        /*value*/
                        void 0);
                    }
                    if (state.traceEnabled) {
                        trace(state.host, Diagnostics.Using_0_subpath_1_with_target_2, isImports ? "imports" : "exports", key, pattern ? target.replace(/\*/g, subpath) : target + subpath);
                    }
                    const finalPath = toAbsolutePath(pattern ? resolvedTarget.replace(/\*/g, subpath) : resolvedTarget + subpath);
                    const inputLink = tryLoadInputFileForPath(finalPath, subpath, combinePaths(scope.packageDirectory, "package.json"), isImports);
                    if (inputLink)
                        return inputLink;
                    return toSearchResult(withPackageId(scope, loadFileNameFromPackageJsonField(extensions, finalPath, 
                    /*onlyRecordFailures*/
                    false, state)));
                }
                else if (typeof target === "object" && target !== null) {
                    if (!Array.isArray(target)) {
                        traceIfEnabled(state, Diagnostics.Entering_conditional_exports);
                        for (const condition of getOwnKeys(target)) {
                            if (condition === "default" || state.conditions.indexOf(condition) >= 0 || isApplicableVersionedTypesKey(state.conditions, condition)) {
                                traceIfEnabled(state, Diagnostics.Matched_0_condition_1, isImports ? "imports" : "exports", condition);
                                const subTarget = target[condition];
                                const result = loadModuleFromTargetImportOrExport(subTarget, subpath, pattern, key);
                                if (result) {
                                    traceIfEnabled(state, Diagnostics.Resolved_under_condition_0, condition);
                                    traceIfEnabled(state, Diagnostics.Exiting_conditional_exports);
                                    return result;
                                }
                                else {
                                    traceIfEnabled(state, Diagnostics.Failed_to_resolve_under_condition_0, condition);
                                }
                            }
                            else {
                                traceIfEnabled(state, Diagnostics.Saw_non_matching_condition_0, condition);
                            }
                        }
                        traceIfEnabled(state, Diagnostics.Exiting_conditional_exports);
                        return void 0;
                    }
                    else {
                        if (!length(target)) {
                            if (state.traceEnabled) {
                                trace(state.host, Diagnostics.package_json_scope_0_has_invalid_type_for_target_of_specifier_1, scope.packageDirectory, moduleName);
                            }
                            return toSearchResult(
                            /*value*/
                            void 0);
                        }
                        for (const elem of target) {
                            const result = loadModuleFromTargetImportOrExport(elem, subpath, pattern, key);
                            if (result) {
                                return result;
                            }
                        }
                    }
                }
                else if (target === null) {
                    if (state.traceEnabled) {
                        trace(state.host, Diagnostics.package_json_scope_0_explicitly_maps_specifier_1_to_null, scope.packageDirectory, moduleName);
                    }
                    return toSearchResult(
                    /*value*/
                    void 0);
                }
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.package_json_scope_0_has_invalid_type_for_target_of_specifier_1, scope.packageDirectory, moduleName);
                }
                return toSearchResult(
                /*value*/
                void 0);
                function toAbsolutePath(path) {
                    var _a2, _b;
                    if (path === void 0)
                        return path;
                    return getNormalizedAbsolutePath(path, (_b = (_a2 = state.host).getCurrentDirectory) == null ? void 0 : _b.call(_a2));
                }
                function combineDirectoryPath(root, dir) {
                    return ensureTrailingDirectorySeparator(combinePaths(root, dir));
                }
                function useCaseSensitiveFileNames() {
                    return !state.host.useCaseSensitiveFileNames ? true : typeof state.host.useCaseSensitiveFileNames === "boolean" ? state.host.useCaseSensitiveFileNames : state.host.useCaseSensitiveFileNames();
                }
                function tryLoadInputFileForPath(finalPath, entry, packagePath, isImports2) {
                    var _a2, _b, _c, _d;
                    if (!state.isConfigLookup && (state.compilerOptions.declarationDir || state.compilerOptions.outDir) && finalPath.indexOf("/node_modules/") === -1 && (state.compilerOptions.configFile ? containsPath(scope.packageDirectory, toAbsolutePath(state.compilerOptions.configFile.fileName), !useCaseSensitiveFileNames()) : true)) {
                        const getCanonicalFileName = hostGetCanonicalFileName({ useCaseSensitiveFileNames });
                        const commonSourceDirGuesses = [];
                        if (state.compilerOptions.rootDir || state.compilerOptions.composite && state.compilerOptions.configFilePath) {
                            const commonDir = toAbsolutePath(getCommonSourceDirectory(state.compilerOptions, () => [], ((_b = (_a2 = state.host).getCurrentDirectory) == null ? void 0 : _b.call(_a2)) || "", getCanonicalFileName));
                            commonSourceDirGuesses.push(commonDir);
                        }
                        else if (state.requestContainingDirectory) {
                            const requestingFile = toAbsolutePath(combinePaths(state.requestContainingDirectory, "index.ts"));
                            const commonDir = toAbsolutePath(getCommonSourceDirectory(state.compilerOptions, () => [requestingFile, toAbsolutePath(packagePath)], ((_d = (_c = state.host).getCurrentDirectory) == null ? void 0 : _d.call(_c)) || "", getCanonicalFileName));
                            commonSourceDirGuesses.push(commonDir);
                            let fragment = ensureTrailingDirectorySeparator(commonDir);
                            while (fragment && fragment.length > 1) {
                                const parts = getPathComponents(fragment);
                                parts.pop();
                                const commonDir2 = getPathFromPathComponents(parts);
                                commonSourceDirGuesses.unshift(commonDir2);
                                fragment = ensureTrailingDirectorySeparator(commonDir2);
                            }
                        }
                        if (commonSourceDirGuesses.length > 1) {
                            state.reportDiagnostic(createCompilerDiagnostic(isImports2 ? Diagnostics.The_project_root_is_ambiguous_but_is_required_to_resolve_import_map_entry_0_in_file_1_Supply_the_rootDir_compiler_option_to_disambiguate : Diagnostics.The_project_root_is_ambiguous_but_is_required_to_resolve_export_map_entry_0_in_file_1_Supply_the_rootDir_compiler_option_to_disambiguate, entry === "" ? "." : entry, 
                            // replace empty string with `.` - the reverse of the operation done when entries are built - so main entrypoint errors don't look weird
                            packagePath));
                        }
                        for (const commonSourceDirGuess of commonSourceDirGuesses) {
                            const candidateDirectories = getOutputDirectoriesForBaseDirectory(commonSourceDirGuess);
                            for (const candidateDir of candidateDirectories) {
                                if (containsPath(candidateDir, finalPath, !useCaseSensitiveFileNames())) {
                                    const pathFragment = finalPath.slice(candidateDir.length + 1);
                                    const possibleInputBase = combinePaths(commonSourceDirGuess, pathFragment);
                                    const jsAndDtsExtensions = [".mjs" /* Mjs */, ".cjs" /* Cjs */, ".js" /* Js */, ".json" /* Json */, ".d.mts" /* Dmts */, ".d.cts" /* Dcts */, ".d.ts" /* Dts */];
                                    for (const ext of jsAndDtsExtensions) {
                                        if (fileExtensionIs(possibleInputBase, ext)) {
                                            const inputExts = getPossibleOriginalInputExtensionForExtension(possibleInputBase);
                                            for (const possibleExt of inputExts) {
                                                if (!extensionIsOk(extensions, possibleExt))
                                                    continue;
                                                const possibleInputWithInputExtension = changeAnyExtension(possibleInputBase, possibleExt, ext, !useCaseSensitiveFileNames());
                                                if (state.host.fileExists(possibleInputWithInputExtension)) {
                                                    return toSearchResult(withPackageId(scope, loadFileNameFromPackageJsonField(extensions, possibleInputWithInputExtension, 
                                                    /*onlyRecordFailures*/
                                                    false, state)));
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return void 0;
                    function getOutputDirectoriesForBaseDirectory(commonSourceDirGuess) {
                        var _a3, _b2;
                        const currentDir = state.compilerOptions.configFile ? ((_b2 = (_a3 = state.host).getCurrentDirectory) == null ? void 0 : _b2.call(_a3)) || "" : commonSourceDirGuess;
                        const candidateDirectories = [];
                        if (state.compilerOptions.declarationDir) {
                            candidateDirectories.push(toAbsolutePath(combineDirectoryPath(currentDir, state.compilerOptions.declarationDir)));
                        }
                        if (state.compilerOptions.outDir && state.compilerOptions.outDir !== state.compilerOptions.declarationDir) {
                            candidateDirectories.push(toAbsolutePath(combineDirectoryPath(currentDir, state.compilerOptions.outDir)));
                        }
                        return candidateDirectories;
                    }
                }
            }