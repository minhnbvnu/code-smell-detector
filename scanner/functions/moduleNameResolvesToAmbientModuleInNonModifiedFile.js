function moduleNameResolvesToAmbientModuleInNonModifiedFile(moduleName) {
                    const resolutionToFile = getResolvedModule(oldSourceFile, moduleName.text, getModeForUsageLocation(file, moduleName));
                    const resolvedFile = resolutionToFile && oldProgram.getSourceFile(resolutionToFile.resolvedFileName);
                    if (resolutionToFile && resolvedFile) {
                        return false;
                    }
                    const unmodifiedFile = ambientModuleNameToUnmodifiedFileName.get(moduleName.text);
                    if (!unmodifiedFile) {
                        return false;
                    }
                    if (isTraceEnabled(options, host)) {
                        trace(host, Diagnostics.Module_0_was_resolved_as_ambient_module_declared_in_1_since_this_file_was_not_modified, moduleName.text, unmodifiedFile);
                    }
                    return true;
                }