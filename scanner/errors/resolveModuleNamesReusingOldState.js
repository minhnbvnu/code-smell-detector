function resolveModuleNamesReusingOldState(moduleNames, file) {
                var _a3;
                if (structureIsReused === 0 /* Not */ && !file.ambientModuleNames.length) {
                    return resolveModuleNamesWorker(moduleNames, file, 
                    /*reusedNames*/
                    void 0);
                }
                const oldSourceFile = oldProgram && oldProgram.getSourceFile(file.fileName);
                if (oldSourceFile !== file && file.resolvedModules) {
                    const result2 = [];
                    for (const moduleName of moduleNames) {
                        const resolvedModule = file.resolvedModules.get(moduleName.text, getModeForUsageLocation(file, moduleName));
                        result2.push(resolvedModule);
                    }
                    return result2;
                }
                let unknownModuleNames;
                let result;
                let reusedNames;
                const predictedToResolveToAmbientModuleMarker = emptyResolution;
                for (let i = 0; i < moduleNames.length; i++) {
                    const moduleName = moduleNames[i];
                    if (file === oldSourceFile && !hasInvalidatedResolutions(oldSourceFile.path)) {
                        const mode = getModeForUsageLocation(file, moduleName);
                        const oldResolution = (_a3 = oldSourceFile.resolvedModules) == null ? void 0 : _a3.get(moduleName.text, mode);
                        if (oldResolution == null ? void 0 : oldResolution.resolvedModule) {
                            if (isTraceEnabled(options, host)) {
                                trace(host, oldResolution.resolvedModule.packageId ? Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2_with_Package_ID_3 : Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2, moduleName.text, getNormalizedAbsolutePath(file.originalFileName, currentDirectory), oldResolution.resolvedModule.resolvedFileName, oldResolution.resolvedModule.packageId && packageIdToString(oldResolution.resolvedModule.packageId));
                            }
                            (result != null ? result : result = new Array(moduleNames.length))[i] = oldResolution;
                            (reusedNames != null ? reusedNames : reusedNames = []).push(moduleName);
                            continue;
                        }
                    }
                    let resolvesToAmbientModuleInNonModifiedFile = false;
                    if (contains(file.ambientModuleNames, moduleName.text)) {
                        resolvesToAmbientModuleInNonModifiedFile = true;
                        if (isTraceEnabled(options, host)) {
                            trace(host, Diagnostics.Module_0_was_resolved_as_locally_declared_ambient_module_in_file_1, moduleName.text, getNormalizedAbsolutePath(file.originalFileName, currentDirectory));
                        }
                    }
                    else {
                        resolvesToAmbientModuleInNonModifiedFile = moduleNameResolvesToAmbientModuleInNonModifiedFile(moduleName);
                    }
                    if (resolvesToAmbientModuleInNonModifiedFile) {
                        (result || (result = new Array(moduleNames.length)))[i] = predictedToResolveToAmbientModuleMarker;
                    }
                    else {
                        (unknownModuleNames != null ? unknownModuleNames : unknownModuleNames = []).push(moduleName);
                    }
                }
                const resolutions = unknownModuleNames && unknownModuleNames.length ? resolveModuleNamesWorker(unknownModuleNames, file, reusedNames) : emptyArray;
                if (!result) {
                    Debug.assert(resolutions.length === moduleNames.length);
                    return resolutions;
                }
                let j = 0;
                for (let i = 0; i < result.length; i++) {
                    if (!result[i]) {
                        result[i] = resolutions[j];
                        j++;
                    }
                }
                Debug.assert(j === resolutions.length);
                return result;
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
            }