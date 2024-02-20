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