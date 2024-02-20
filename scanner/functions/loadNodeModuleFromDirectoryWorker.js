function loadNodeModuleFromDirectoryWorker(extensions, candidate, onlyRecordFailures, state, jsonContent, versionPaths) {
            let packageFile;
            if (jsonContent) {
                if (state.isConfigLookup) {
                    packageFile = readPackageJsonTSConfigField(jsonContent, candidate, state);
                }
                else {
                    packageFile = extensions & 4 /* Declaration */ && readPackageJsonTypesFields(jsonContent, candidate, state) || extensions & (3 /* ImplementationFiles */ | 4 /* Declaration */) && readPackageJsonMainField(jsonContent, candidate, state) || void 0;
                }
            }
            const loader = (extensions2, candidate2, onlyRecordFailures2, state2) => {
                const fromFile = tryFile(candidate2, onlyRecordFailures2, state2);
                if (fromFile) {
                    const resolved = resolvedIfExtensionMatches(extensions2, fromFile);
                    if (resolved) {
                        return noPackageId(resolved);
                    }
                    if (state2.traceEnabled) {
                        trace(state2.host, Diagnostics.File_0_has_an_unsupported_extension_so_skipping_it, fromFile);
                    }
                }
                const expandedExtensions = extensions2 === 4 /* Declaration */ ? 1 /* TypeScript */ | 4 /* Declaration */ : extensions2;
                const features = state2.features;
                const candidateIsFromPackageJsonField = state2.candidateIsFromPackageJsonField;
                state2.candidateIsFromPackageJsonField = true;
                if ((jsonContent == null ? void 0 : jsonContent.type) !== "module") {
                    state2.features &= ~32 /* EsmMode */;
                }
                const result = nodeLoadModuleByRelativeName(expandedExtensions, candidate2, onlyRecordFailures2, state2, 
                /*considerPackageJson*/
                false);
                state2.features = features;
                state2.candidateIsFromPackageJsonField = candidateIsFromPackageJsonField;
                return result;
            };
            const onlyRecordFailuresForPackageFile = packageFile ? !directoryProbablyExists(getDirectoryPath(packageFile), state.host) : void 0;
            const onlyRecordFailuresForIndex = onlyRecordFailures || !directoryProbablyExists(candidate, state.host);
            const indexPath = combinePaths(candidate, state.isConfigLookup ? "tsconfig" : "index");
            if (versionPaths && (!packageFile || containsPath(candidate, packageFile))) {
                const moduleName = getRelativePathFromDirectory(candidate, packageFile || indexPath, 
                /*ignoreCase*/
                false);
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.package_json_has_a_typesVersions_entry_0_that_matches_compiler_version_1_looking_for_a_pattern_to_match_module_name_2, versionPaths.version, version, moduleName);
                }
                const result = tryLoadModuleUsingPaths(extensions, moduleName, candidate, versionPaths.paths, 
                /*pathPatterns*/
                void 0, loader, onlyRecordFailuresForPackageFile || onlyRecordFailuresForIndex, state);
                if (result) {
                    return removeIgnoredPackageId(result.value);
                }
            }
            const packageFileResult = packageFile && removeIgnoredPackageId(loader(extensions, packageFile, onlyRecordFailuresForPackageFile, state));
            if (packageFileResult)
                return packageFileResult;
            if (!(state.features & 32 /* EsmMode */)) {
                return loadModuleFromFile(extensions, indexPath, onlyRecordFailuresForIndex, state);
            }
        }