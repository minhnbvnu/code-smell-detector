function resolveTypeReferenceDirectiveNamesReusingOldState(typeDirectiveNames, containingFile) {
                var _a3;
                if (structureIsReused === 0 /* Not */) {
                    return resolveTypeReferenceDirectiveNamesWorker(typeDirectiveNames, containingFile, 
                    /*resuedNames*/
                    void 0);
                }
                const oldSourceFile = !isString(containingFile) ? oldProgram && oldProgram.getSourceFile(containingFile.fileName) : void 0;
                if (!isString(containingFile)) {
                    if (oldSourceFile !== containingFile && containingFile.resolvedTypeReferenceDirectiveNames) {
                        const result2 = [];
                        for (const typeDirectiveName of typeDirectiveNames) {
                            const resolvedTypeReferenceDirective = containingFile.resolvedTypeReferenceDirectiveNames.get(getTypeReferenceResolutionName(typeDirectiveName), getModeForFileReference(typeDirectiveName, containingFile.impliedNodeFormat));
                            result2.push(resolvedTypeReferenceDirective);
                        }
                        return result2;
                    }
                }
                let unknownTypeReferenceDirectiveNames;
                let result;
                let reusedNames;
                const containingSourceFile = !isString(containingFile) ? containingFile : void 0;
                const canReuseResolutions = !isString(containingFile) ? containingFile === oldSourceFile && !hasInvalidatedResolutions(oldSourceFile.path) : !hasInvalidatedResolutions(toPath3(containingFile));
                for (let i = 0; i < typeDirectiveNames.length; i++) {
                    const entry = typeDirectiveNames[i];
                    if (canReuseResolutions) {
                        const typeDirectiveName = getTypeReferenceResolutionName(entry);
                        const mode = getModeForFileReference(entry, containingSourceFile == null ? void 0 : containingSourceFile.impliedNodeFormat);
                        const oldResolution = (_a3 = !isString(containingFile) ? oldSourceFile == null ? void 0 : oldSourceFile.resolvedTypeReferenceDirectiveNames : oldProgram == null ? void 0 : oldProgram.getAutomaticTypeDirectiveResolutions()) == null ? void 0 : _a3.get(typeDirectiveName, mode);
                        if (oldResolution == null ? void 0 : oldResolution.resolvedTypeReferenceDirective) {
                            if (isTraceEnabled(options, host)) {
                                trace(host, oldResolution.resolvedTypeReferenceDirective.packageId ? Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_successfully_resolved_to_2_with_Package_ID_3 : Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_successfully_resolved_to_2, typeDirectiveName, !isString(containingFile) ? getNormalizedAbsolutePath(containingFile.originalFileName, currentDirectory) : containingFile, oldResolution.resolvedTypeReferenceDirective.resolvedFileName, oldResolution.resolvedTypeReferenceDirective.packageId && packageIdToString(oldResolution.resolvedTypeReferenceDirective.packageId));
                            }
                            (result != null ? result : result = new Array(typeDirectiveNames.length))[i] = oldResolution;
                            (reusedNames != null ? reusedNames : reusedNames = []).push(entry);
                            continue;
                        }
                    }
                    (unknownTypeReferenceDirectiveNames != null ? unknownTypeReferenceDirectiveNames : unknownTypeReferenceDirectiveNames = []).push(entry);
                }
                if (!unknownTypeReferenceDirectiveNames)
                    return result || emptyArray;
                const resolutions = resolveTypeReferenceDirectiveNamesWorker(unknownTypeReferenceDirectiveNames, containingFile, reusedNames);
                if (!result) {
                    Debug.assert(resolutions.length === typeDirectiveNames.length);
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
            }