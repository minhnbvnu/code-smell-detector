function verifyProjectReferences() {
                const buildInfoPath = !options.suppressOutputPathCheck ? getTsBuildInfoEmitOutputFilePath(options) : void 0;
                forEachProjectReference(projectReferences, resolvedProjectReferences, (resolvedRef, parent2, index) => {
                    const ref = (parent2 ? parent2.commandLine.projectReferences : projectReferences)[index];
                    const parentFile = parent2 && parent2.sourceFile;
                    verifyDeprecatedProjectReference(ref, parentFile, index);
                    if (!resolvedRef) {
                        createDiagnosticForReference(parentFile, index, Diagnostics.File_0_not_found, ref.path);
                        return;
                    }
                    const options2 = resolvedRef.commandLine.options;
                    if (!options2.composite || options2.noEmit) {
                        const inputs = parent2 ? parent2.commandLine.fileNames : rootNames;
                        if (inputs.length) {
                            if (!options2.composite)
                                createDiagnosticForReference(parentFile, index, Diagnostics.Referenced_project_0_must_have_setting_composite_Colon_true, ref.path);
                            if (options2.noEmit)
                                createDiagnosticForReference(parentFile, index, Diagnostics.Referenced_project_0_may_not_disable_emit, ref.path);
                        }
                    }
                    if (ref.prepend) {
                        const out = outFile(options2);
                        if (out) {
                            if (!host.fileExists(out)) {
                                createDiagnosticForReference(parentFile, index, Diagnostics.Output_file_0_from_project_1_does_not_exist, out, ref.path);
                            }
                        }
                        else {
                            createDiagnosticForReference(parentFile, index, Diagnostics.Cannot_prepend_project_0_because_it_does_not_have_outFile_set, ref.path);
                        }
                    }
                    if (!parent2 && buildInfoPath && buildInfoPath === getTsBuildInfoEmitOutputFilePath(options2)) {
                        createDiagnosticForReference(parentFile, index, Diagnostics.Cannot_write_file_0_because_it_will_overwrite_tsbuildinfo_file_generated_by_referenced_project_1, buildInfoPath, ref.path);
                        hasEmitBlockingDiagnostics.set(toPath3(buildInfoPath), true);
                    }
                });
            }