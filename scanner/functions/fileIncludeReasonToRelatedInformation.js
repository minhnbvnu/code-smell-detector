function fileIncludeReasonToRelatedInformation(reason) {
                if (isReferencedFile(reason)) {
                    const referenceLocation = getReferencedFileLocation(getSourceFileByPath, reason);
                    let message2;
                    switch (reason.kind) {
                        case 3 /* Import */:
                            message2 = Diagnostics.File_is_included_via_import_here;
                            break;
                        case 4 /* ReferenceFile */:
                            message2 = Diagnostics.File_is_included_via_reference_here;
                            break;
                        case 5 /* TypeReferenceDirective */:
                            message2 = Diagnostics.File_is_included_via_type_library_reference_here;
                            break;
                        case 7 /* LibReferenceDirective */:
                            message2 = Diagnostics.File_is_included_via_library_reference_here;
                            break;
                        default:
                            Debug.assertNever(reason);
                    }
                    return isReferenceFileLocation(referenceLocation) ? createFileDiagnostic(referenceLocation.file, referenceLocation.pos, referenceLocation.end - referenceLocation.pos, message2) : void 0;
                }
                if (!options.configFile)
                    return void 0;
                let configFileNode;
                let message;
                switch (reason.kind) {
                    case 0 /* RootFile */:
                        if (!options.configFile.configFileSpecs)
                            return void 0;
                        const fileName = getNormalizedAbsolutePath(rootNames[reason.index], currentDirectory);
                        const matchedByFiles = getMatchedFileSpec(program, fileName);
                        if (matchedByFiles) {
                            configFileNode = getTsConfigPropArrayElementValue(options.configFile, "files", matchedByFiles);
                            message = Diagnostics.File_is_matched_by_files_list_specified_here;
                            break;
                        }
                        const matchedByInclude = getMatchedIncludeSpec(program, fileName);
                        if (!matchedByInclude || !isString(matchedByInclude))
                            return void 0;
                        configFileNode = getTsConfigPropArrayElementValue(options.configFile, "include", matchedByInclude);
                        message = Diagnostics.File_is_matched_by_include_pattern_specified_here;
                        break;
                    case 1 /* SourceFromProjectReference */:
                    case 2 /* OutputFromProjectReference */:
                        const referencedResolvedRef = Debug.checkDefined(resolvedProjectReferences == null ? void 0 : resolvedProjectReferences[reason.index]);
                        const referenceInfo = forEachProjectReference(projectReferences, resolvedProjectReferences, (resolvedRef, parent2, index2) => resolvedRef === referencedResolvedRef ? { sourceFile: (parent2 == null ? void 0 : parent2.sourceFile) || options.configFile, index: index2 } : void 0);
                        if (!referenceInfo)
                            return void 0;
                        const { sourceFile, index } = referenceInfo;
                        const referencesSyntax = firstDefined(getTsConfigPropArray(sourceFile, "references"), (property) => isArrayLiteralExpression(property.initializer) ? property.initializer : void 0);
                        return referencesSyntax && referencesSyntax.elements.length > index ? createDiagnosticForNodeInSourceFile(sourceFile, referencesSyntax.elements[index], reason.kind === 2 /* OutputFromProjectReference */ ? Diagnostics.File_is_output_from_referenced_project_specified_here : Diagnostics.File_is_source_from_referenced_project_specified_here) : void 0;
                    case 8 /* AutomaticTypeDirectiveFile */:
                        if (!options.types)
                            return void 0;
                        configFileNode = getOptionsSyntaxByArrayElementValue("types", reason.typeReference);
                        message = Diagnostics.File_is_entry_point_of_type_library_specified_here;
                        break;
                    case 6 /* LibFile */:
                        if (reason.index !== void 0) {
                            configFileNode = getOptionsSyntaxByArrayElementValue("lib", options.lib[reason.index]);
                            message = Diagnostics.File_is_library_specified_here;
                            break;
                        }
                        const target = forEachEntry(targetOptionDeclaration.type, (value, key) => value === getEmitScriptTarget(options) ? key : void 0);
                        configFileNode = target ? getOptionsSyntaxByValue("target", target) : void 0;
                        message = Diagnostics.File_is_default_library_for_target_specified_here;
                        break;
                    default:
                        Debug.assertNever(reason);
                }
                return configFileNode && createDiagnosticForNodeInSourceFile(options.configFile, configFileNode, message);
            }