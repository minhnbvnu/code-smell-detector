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