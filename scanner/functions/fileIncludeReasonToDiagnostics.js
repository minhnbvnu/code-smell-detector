function fileIncludeReasonToDiagnostics(program, reason, fileNameConvertor) {
            var _a2, _b;
            const options = program.getCompilerOptions();
            if (isReferencedFile(reason)) {
                const referenceLocation = getReferencedFileLocation((path) => program.getSourceFileByPath(path), reason);
                const referenceText = isReferenceFileLocation(referenceLocation) ? referenceLocation.file.text.substring(referenceLocation.pos, referenceLocation.end) : `"${referenceLocation.text}"`;
                let message;
                Debug.assert(isReferenceFileLocation(referenceLocation) || reason.kind === 3 /* Import */, "Only synthetic references are imports");
                switch (reason.kind) {
                    case 3 /* Import */:
                        if (isReferenceFileLocation(referenceLocation)) {
                            message = referenceLocation.packageId ? Diagnostics.Imported_via_0_from_file_1_with_packageId_2 : Diagnostics.Imported_via_0_from_file_1;
                        }
                        else if (referenceLocation.text === externalHelpersModuleNameText) {
                            message = referenceLocation.packageId ? Diagnostics.Imported_via_0_from_file_1_with_packageId_2_to_import_importHelpers_as_specified_in_compilerOptions : Diagnostics.Imported_via_0_from_file_1_to_import_importHelpers_as_specified_in_compilerOptions;
                        }
                        else {
                            message = referenceLocation.packageId ? Diagnostics.Imported_via_0_from_file_1_with_packageId_2_to_import_jsx_and_jsxs_factory_functions : Diagnostics.Imported_via_0_from_file_1_to_import_jsx_and_jsxs_factory_functions;
                        }
                        break;
                    case 4 /* ReferenceFile */:
                        Debug.assert(!referenceLocation.packageId);
                        message = Diagnostics.Referenced_via_0_from_file_1;
                        break;
                    case 5 /* TypeReferenceDirective */:
                        message = referenceLocation.packageId ? Diagnostics.Type_library_referenced_via_0_from_file_1_with_packageId_2 : Diagnostics.Type_library_referenced_via_0_from_file_1;
                        break;
                    case 7 /* LibReferenceDirective */:
                        Debug.assert(!referenceLocation.packageId);
                        message = Diagnostics.Library_referenced_via_0_from_file_1;
                        break;
                    default:
                        Debug.assertNever(reason);
                }
                return chainDiagnosticMessages(
                /*details*/
                void 0, message, referenceText, toFileName(referenceLocation.file, fileNameConvertor), referenceLocation.packageId && packageIdToString(referenceLocation.packageId));
            }
            switch (reason.kind) {
                case 0 /* RootFile */:
                    if (!((_a2 = options.configFile) == null ? void 0 : _a2.configFileSpecs))
                        return chainDiagnosticMessages(
                        /*details*/
                        void 0, Diagnostics.Root_file_specified_for_compilation);
                    const fileName = getNormalizedAbsolutePath(program.getRootFileNames()[reason.index], program.getCurrentDirectory());
                    const matchedByFiles = getMatchedFileSpec(program, fileName);
                    if (matchedByFiles)
                        return chainDiagnosticMessages(
                        /*details*/
                        void 0, Diagnostics.Part_of_files_list_in_tsconfig_json);
                    const matchedByInclude = getMatchedIncludeSpec(program, fileName);
                    return isString(matchedByInclude) ? chainDiagnosticMessages(
                    /*details*/
                    void 0, Diagnostics.Matched_by_include_pattern_0_in_1, matchedByInclude, toFileName(options.configFile, fileNameConvertor)) : (
                    // Could be additional files specified as roots or matched by default include
                    chainDiagnosticMessages(
                    /*details*/
                    void 0, matchedByInclude ? Diagnostics.Matched_by_default_include_pattern_Asterisk_Asterisk_Slash_Asterisk : Diagnostics.Root_file_specified_for_compilation));
                case 1 /* SourceFromProjectReference */:
                case 2 /* OutputFromProjectReference */:
                    const isOutput = reason.kind === 2 /* OutputFromProjectReference */;
                    const referencedResolvedRef = Debug.checkDefined((_b = program.getResolvedProjectReferences()) == null ? void 0 : _b[reason.index]);
                    return chainDiagnosticMessages(
                    /*details*/
                    void 0, outFile(options) ? isOutput ? Diagnostics.Output_from_referenced_project_0_included_because_1_specified : Diagnostics.Source_from_referenced_project_0_included_because_1_specified : isOutput ? Diagnostics.Output_from_referenced_project_0_included_because_module_is_specified_as_none : Diagnostics.Source_from_referenced_project_0_included_because_module_is_specified_as_none, toFileName(referencedResolvedRef.sourceFile.fileName, fileNameConvertor), options.outFile ? "--outFile" : "--out");
                case 8 /* AutomaticTypeDirectiveFile */:
                    return chainDiagnosticMessages(
                    /*details*/
                    void 0, options.types ? reason.packageId ? Diagnostics.Entry_point_of_type_library_0_specified_in_compilerOptions_with_packageId_1 : Diagnostics.Entry_point_of_type_library_0_specified_in_compilerOptions : reason.packageId ? Diagnostics.Entry_point_for_implicit_type_library_0_with_packageId_1 : Diagnostics.Entry_point_for_implicit_type_library_0, reason.typeReference, reason.packageId && packageIdToString(reason.packageId));
                case 6 /* LibFile */:
                    if (reason.index !== void 0)
                        return chainDiagnosticMessages(
                        /*details*/
                        void 0, Diagnostics.Library_0_specified_in_compilerOptions, options.lib[reason.index]);
                    const target = forEachEntry(targetOptionDeclaration.type, (value, key) => value === getEmitScriptTarget(options) ? key : void 0);
                    return chainDiagnosticMessages(
                    /*details*/
                    void 0, target ? Diagnostics.Default_library_for_target_0 : Diagnostics.Default_library, target);
                default:
                    Debug.assertNever(reason);
            }
        }