function nodeLoadModuleByRelativeName(extensions, candidate, onlyRecordFailures, state, considerPackageJson) {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Loading_module_as_file_Slash_folder_candidate_module_location_0_target_file_types_Colon_1, candidate, formatExtensions(extensions));
            }
            if (!hasTrailingDirectorySeparator(candidate)) {
                if (!onlyRecordFailures) {
                    const parentOfCandidate = getDirectoryPath(candidate);
                    if (!directoryProbablyExists(parentOfCandidate, state.host)) {
                        if (state.traceEnabled) {
                            trace(state.host, Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, parentOfCandidate);
                        }
                        onlyRecordFailures = true;
                    }
                }
                const resolvedFromFile = loadModuleFromFile(extensions, candidate, onlyRecordFailures, state);
                if (resolvedFromFile) {
                    const packageDirectory = considerPackageJson ? parseNodeModuleFromPath(resolvedFromFile.path) : void 0;
                    const packageInfo = packageDirectory ? getPackageJsonInfo(packageDirectory, 
                    /*onlyRecordFailures*/
                    false, state) : void 0;
                    return withPackageId(packageInfo, resolvedFromFile);
                }
            }
            if (!onlyRecordFailures) {
                const candidateExists = directoryProbablyExists(candidate, state.host);
                if (!candidateExists) {
                    if (state.traceEnabled) {
                        trace(state.host, Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, candidate);
                    }
                    onlyRecordFailures = true;
                }
            }
            if (!(state.features & 32 /* EsmMode */)) {
                return loadNodeModuleFromDirectory(extensions, candidate, onlyRecordFailures, state, considerPackageJson);
            }
            return void 0;
        }