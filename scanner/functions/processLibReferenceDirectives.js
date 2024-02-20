function processLibReferenceDirectives(file) {
                forEach(file.libReferenceDirectives, (libReference, index) => {
                    const libName = toFileNameLowerCase(libReference.fileName);
                    const libFileName = libMap.get(libName);
                    if (libFileName) {
                        processRootFile(pathForLibFile(libFileName), 
                        /*isDefaultLib*/
                        true, 
                        /*ignoreNoDefaultLib*/
                        true, { kind: 7 /* LibReferenceDirective */, file: file.path, index });
                    }
                    else {
                        const unqualifiedLibName = removeSuffix(removePrefix(libName, "lib."), ".d.ts");
                        const suggestion = getSpellingSuggestion(unqualifiedLibName, libs, identity);
                        const diagnostic = suggestion ? Diagnostics.Cannot_find_lib_definition_for_0_Did_you_mean_1 : Diagnostics.Cannot_find_lib_definition_for_0;
                        (fileProcessingDiagnostics || (fileProcessingDiagnostics = [])).push({
                            kind: 0 /* FilePreprocessingReferencedDiagnostic */,
                            reason: { kind: 7 /* LibReferenceDirective */, file: file.path, index },
                            diagnostic,
                            args: [libName, suggestion]
                        });
                    }
                });
            }