function processTypeReferenceDirectiveWorker(typeReferenceDirective, mode, resolution, reason) {
                var _a3;
                addResolutionDiagnostics(resolution);
                const previousResolution = (_a3 = resolvedTypeReferenceDirectives.get(typeReferenceDirective, mode)) == null ? void 0 : _a3.resolvedTypeReferenceDirective;
                if (previousResolution && previousResolution.primary) {
                    return;
                }
                let saveResolution = true;
                const { resolvedTypeReferenceDirective } = resolution;
                if (resolvedTypeReferenceDirective) {
                    if (resolvedTypeReferenceDirective.isExternalLibraryImport)
                        currentNodeModulesDepth++;
                    if (resolvedTypeReferenceDirective.primary) {
                        processSourceFile(resolvedTypeReferenceDirective.resolvedFileName, 
                        /*isDefaultLib*/
                        false, 
                        /*ignoreNoDefaultLib*/
                        false, resolvedTypeReferenceDirective.packageId, reason);
                    }
                    else {
                        if (previousResolution) {
                            if (resolvedTypeReferenceDirective.resolvedFileName !== previousResolution.resolvedFileName) {
                                const otherFileText = host.readFile(resolvedTypeReferenceDirective.resolvedFileName);
                                const existingFile = getSourceFile(previousResolution.resolvedFileName);
                                if (otherFileText !== existingFile.text) {
                                    addFilePreprocessingFileExplainingDiagnostic(existingFile, reason, Diagnostics.Conflicting_definitions_for_0_found_at_1_and_2_Consider_installing_a_specific_version_of_this_library_to_resolve_the_conflict, [typeReferenceDirective, resolvedTypeReferenceDirective.resolvedFileName, previousResolution.resolvedFileName]);
                                }
                            }
                            saveResolution = false;
                        }
                        else {
                            processSourceFile(resolvedTypeReferenceDirective.resolvedFileName, 
                            /*isDefaultLib*/
                            false, 
                            /*ignoreNoDefaultLib*/
                            false, resolvedTypeReferenceDirective.packageId, reason);
                        }
                    }
                    if (resolvedTypeReferenceDirective.isExternalLibraryImport)
                        currentNodeModulesDepth--;
                }
                else {
                    addFilePreprocessingFileExplainingDiagnostic(
                    /*file*/
                    void 0, reason, Diagnostics.Cannot_find_type_definition_file_for_0, [typeReferenceDirective]);
                }
                if (saveResolution) {
                    resolvedTypeReferenceDirectives.set(typeReferenceDirective, mode, resolution);
                }
            }