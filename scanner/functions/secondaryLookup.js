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