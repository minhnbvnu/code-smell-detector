function processTypeReferenceDirectives(file) {
                const typeDirectives = file.typeReferenceDirectives;
                if (!typeDirectives.length) {
                    file.resolvedTypeReferenceDirectiveNames = void 0;
                    return;
                }
                const resolutions = resolveTypeReferenceDirectiveNamesReusingOldState(typeDirectives, file);
                for (let index = 0; index < typeDirectives.length; index++) {
                    const ref = file.typeReferenceDirectives[index];
                    const resolvedTypeReferenceDirective = resolutions[index];
                    const fileName = toFileNameLowerCase(ref.fileName);
                    setResolvedTypeReferenceDirective(file, fileName, resolvedTypeReferenceDirective, getModeForFileReference(ref, file.impliedNodeFormat));
                    const mode = ref.resolutionMode || file.impliedNodeFormat;
                    if (mode && getEmitModuleResolutionKind(options) !== 3 /* Node16 */ && getEmitModuleResolutionKind(options) !== 99 /* NodeNext */) {
                        (fileProcessingDiagnostics != null ? fileProcessingDiagnostics : fileProcessingDiagnostics = []).push({
                            kind: 2 /* ResolutionDiagnostics */,
                            diagnostics: [
                                createDiagnosticForRange(file, ref, Diagnostics.resolution_mode_assertions_are_only_supported_when_moduleResolution_is_node16_or_nodenext)
                            ]
                        });
                    }
                    processTypeReferenceDirective(fileName, mode, resolvedTypeReferenceDirective, { kind: 5 /* TypeReferenceDirective */, file: file.path, index });
                }
            }