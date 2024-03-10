function resolveExternalModule(location, moduleReference, moduleNotFoundError, errorNode, isForAugmentation = false) {
                var _a2, _b, _c, _d, _e, _f, _g, _h, _i;
                if (startsWith(moduleReference, "@types/")) {
                    const diag2 = Diagnostics.Cannot_import_type_declaration_files_Consider_importing_0_instead_of_1;
                    const withoutAtTypePrefix = removePrefix(moduleReference, "@types/");
                    error(errorNode, diag2, withoutAtTypePrefix, moduleReference);
                }
                const ambientModule = tryFindAmbientModule(moduleReference, 
                /*withAugmentations*/
                true);
                if (ambientModule) {
                    return ambientModule;
                }
                const currentSourceFile = getSourceFileOfNode(location);
                const contextSpecifier = isStringLiteralLike(location) ? location : ((_a2 = findAncestor(location, isImportCall)) == null ? void 0 : _a2.arguments[0]) || ((_b = findAncestor(location, isImportDeclaration)) == null ? void 0 : _b.moduleSpecifier) || ((_c = findAncestor(location, isExternalModuleImportEqualsDeclaration)) == null ? void 0 : _c.moduleReference.expression) || ((_d = findAncestor(location, isExportDeclaration)) == null ? void 0 : _d.moduleSpecifier) || ((_e = isModuleDeclaration(location) ? location : location.parent && isModuleDeclaration(location.parent) && location.parent.name === location ? location.parent : void 0) == null ? void 0 : _e.name) || ((_f = isLiteralImportTypeNode(location) ? location : void 0) == null ? void 0 : _f.argument.literal);
                const mode = contextSpecifier && isStringLiteralLike(contextSpecifier) ? getModeForUsageLocation(currentSourceFile, contextSpecifier) : currentSourceFile.impliedNodeFormat;
                const moduleResolutionKind = getEmitModuleResolutionKind(compilerOptions);
                const resolvedModule = getResolvedModule(currentSourceFile, moduleReference, mode);
                const resolutionDiagnostic = resolvedModule && getResolutionDiagnostic(compilerOptions, resolvedModule, currentSourceFile);
                const sourceFile = resolvedModule && (!resolutionDiagnostic || resolutionDiagnostic === Diagnostics.Module_0_was_resolved_to_1_but_jsx_is_not_set) && host.getSourceFile(resolvedModule.resolvedFileName);
                if (sourceFile) {
                    if (resolutionDiagnostic) {
                        error(errorNode, resolutionDiagnostic, moduleReference, resolvedModule.resolvedFileName);
                    }
                    if (resolvedModule.resolvedUsingTsExtension && isDeclarationFileName(moduleReference)) {
                        const importOrExport = ((_g = findAncestor(location, isImportDeclaration)) == null ? void 0 : _g.importClause) || findAncestor(location, or(isImportEqualsDeclaration, isExportDeclaration));
                        if (importOrExport && !importOrExport.isTypeOnly || findAncestor(location, isImportCall)) {
                            error(errorNode, Diagnostics.A_declaration_file_cannot_be_imported_without_import_type_Did_you_mean_to_import_an_implementation_file_0_instead, getSuggestedImportSource(Debug.checkDefined(tryExtractTSExtension(moduleReference))));
                        }
                    }
                    else if (resolvedModule.resolvedUsingTsExtension && !shouldAllowImportingTsExtension(compilerOptions, currentSourceFile.fileName)) {
                        const tsExtension = Debug.checkDefined(tryExtractTSExtension(moduleReference));
                        error(errorNode, Diagnostics.An_import_path_can_only_end_with_a_0_extension_when_allowImportingTsExtensions_is_enabled, tsExtension);
                    }
                    if (sourceFile.symbol) {
                        if (resolvedModule.isExternalLibraryImport && !resolutionExtensionIsTSOrJson(resolvedModule.extension)) {
                            errorOnImplicitAnyModule(
                            /*isError*/
                            false, errorNode, currentSourceFile, mode, resolvedModule, moduleReference);
                        }
                        if (moduleResolutionKind === 3 /* Node16 */ || moduleResolutionKind === 99 /* NodeNext */) {
                            const isSyncImport = currentSourceFile.impliedNodeFormat === 1 /* CommonJS */ && !findAncestor(location, isImportCall) || !!findAncestor(location, isImportEqualsDeclaration);
                            const overrideClauseHost = findAncestor(location, (l) => isImportTypeNode(l) || isExportDeclaration(l) || isImportDeclaration(l));
                            const overrideClause = overrideClauseHost && isImportTypeNode(overrideClauseHost) ? (_h = overrideClauseHost.assertions) == null ? void 0 : _h.assertClause : overrideClauseHost == null ? void 0 : overrideClauseHost.assertClause;
                            if (isSyncImport && sourceFile.impliedNodeFormat === 99 /* ESNext */ && !getResolutionModeOverrideForClause(overrideClause)) {
                                if (findAncestor(location, isImportEqualsDeclaration)) {
                                    error(errorNode, Diagnostics.Module_0_cannot_be_imported_using_this_construct_The_specifier_only_resolves_to_an_ES_module_which_cannot_be_imported_with_require_Use_an_ECMAScript_import_instead, moduleReference);
                                }
                                else {
                                    let diagnosticDetails;
                                    const ext = tryGetExtensionFromPath2(currentSourceFile.fileName);
                                    if (ext === ".ts" /* Ts */ || ext === ".js" /* Js */ || ext === ".tsx" /* Tsx */ || ext === ".jsx" /* Jsx */) {
                                        const scope = currentSourceFile.packageJsonScope;
                                        const targetExt = ext === ".ts" /* Ts */ ? ".mts" /* Mts */ : ext === ".js" /* Js */ ? ".mjs" /* Mjs */ : void 0;
                                        if (scope && !scope.contents.packageJsonContent.type) {
                                            if (targetExt) {
                                                diagnosticDetails = chainDiagnosticMessages(
                                                /*details*/
                                                void 0, Diagnostics.To_convert_this_file_to_an_ECMAScript_module_change_its_file_extension_to_0_or_add_the_field_type_Colon_module_to_1, targetExt, combinePaths(scope.packageDirectory, "package.json"));
                                            }
                                            else {
                                                diagnosticDetails = chainDiagnosticMessages(
                                                /*details*/
                                                void 0, Diagnostics.To_convert_this_file_to_an_ECMAScript_module_add_the_field_type_Colon_module_to_0, combinePaths(scope.packageDirectory, "package.json"));
                                            }
                                        }
                                        else {
                                            if (targetExt) {
                                                diagnosticDetails = chainDiagnosticMessages(
                                                /*details*/
                                                void 0, Diagnostics.To_convert_this_file_to_an_ECMAScript_module_change_its_file_extension_to_0_or_create_a_local_package_json_file_with_type_Colon_module, targetExt);
                                            }
                                            else {
                                                diagnosticDetails = chainDiagnosticMessages(
                                                /*details*/
                                                void 0, Diagnostics.To_convert_this_file_to_an_ECMAScript_module_create_a_local_package_json_file_with_type_Colon_module);
                                            }
                                        }
                                    }
                                    diagnostics.add(createDiagnosticForNodeFromMessageChain(getSourceFileOfNode(errorNode), errorNode, chainDiagnosticMessages(diagnosticDetails, Diagnostics.The_current_file_is_a_CommonJS_module_whose_imports_will_produce_require_calls_however_the_referenced_file_is_an_ECMAScript_module_and_cannot_be_imported_with_require_Consider_writing_a_dynamic_import_0_call_instead, moduleReference)));
                                }
                            }
                        }
                        return getMergedSymbol(sourceFile.symbol);
                    }
                    if (moduleNotFoundError) {
                        error(errorNode, Diagnostics.File_0_is_not_a_module, sourceFile.fileName);
                    }
                    return void 0;
                }
                if (patternAmbientModules) {
                    const pattern = findBestPatternMatch(patternAmbientModules, (_) => _.pattern, moduleReference);
                    if (pattern) {
                        const augmentation = patternAmbientModuleAugmentations && patternAmbientModuleAugmentations.get(moduleReference);
                        if (augmentation) {
                            return getMergedSymbol(augmentation);
                        }
                        return getMergedSymbol(pattern.symbol);
                    }
                }
                if (resolvedModule && !resolutionExtensionIsTSOrJson(resolvedModule.extension) && resolutionDiagnostic === void 0 || resolutionDiagnostic === Diagnostics.Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type) {
                    if (isForAugmentation) {
                        const diag2 = Diagnostics.Invalid_module_name_in_augmentation_Module_0_resolves_to_an_untyped_module_at_1_which_cannot_be_augmented;
                        error(errorNode, diag2, moduleReference, resolvedModule.resolvedFileName);
                    }
                    else {
                        errorOnImplicitAnyModule(
                        /*isError*/
                        noImplicitAny && !!moduleNotFoundError, errorNode, currentSourceFile, mode, resolvedModule, moduleReference);
                    }
                    return void 0;
                }
                if (moduleNotFoundError) {
                    if (resolvedModule) {
                        const redirect = host.getProjectReferenceRedirect(resolvedModule.resolvedFileName);
                        if (redirect) {
                            error(errorNode, Diagnostics.Output_file_0_has_not_been_built_from_source_file_1, redirect, resolvedModule.resolvedFileName);
                            return void 0;
                        }
                    }
                    if (resolutionDiagnostic) {
                        error(errorNode, resolutionDiagnostic, moduleReference, resolvedModule.resolvedFileName);
                    }
                    else {
                        const isExtensionlessRelativePathImport = pathIsRelative(moduleReference) && !hasExtension(moduleReference);
                        const resolutionIsNode16OrNext = moduleResolutionKind === 3 /* Node16 */ || moduleResolutionKind === 99 /* NodeNext */;
                        if (!getResolveJsonModule(compilerOptions) && fileExtensionIs(moduleReference, ".json" /* Json */) && moduleResolutionKind !== 1 /* Classic */ && hasJsonModuleEmitEnabled(compilerOptions)) {
                            error(errorNode, Diagnostics.Cannot_find_module_0_Consider_using_resolveJsonModule_to_import_module_with_json_extension, moduleReference);
                        }
                        else if (mode === 99 /* ESNext */ && resolutionIsNode16OrNext && isExtensionlessRelativePathImport) {
                            const absoluteRef = getNormalizedAbsolutePath(moduleReference, getDirectoryPath(currentSourceFile.path));
                            const suggestedExt = (_i = suggestedExtensions.find(([actualExt, _importExt]) => host.fileExists(absoluteRef + actualExt))) == null ? void 0 : _i[1];
                            if (suggestedExt) {
                                error(errorNode, Diagnostics.Relative_import_paths_need_explicit_file_extensions_in_EcmaScript_imports_when_moduleResolution_is_node16_or_nodenext_Did_you_mean_0, moduleReference + suggestedExt);
                            }
                            else {
                                error(errorNode, Diagnostics.Relative_import_paths_need_explicit_file_extensions_in_EcmaScript_imports_when_moduleResolution_is_node16_or_nodenext_Consider_adding_an_extension_to_the_import_path);
                            }
                        }
                        else {
                            error(errorNode, moduleNotFoundError, moduleReference);
                        }
                    }
                }
                return void 0;
                function getSuggestedImportSource(tsExtension) {
                    const importSourceWithoutExtension = removeExtension(moduleReference, tsExtension);
                    if (emitModuleKindIsNonNodeESM(moduleKind) || mode === 99 /* ESNext */) {
                        const preferTs = isDeclarationFileName(moduleReference) && shouldAllowImportingTsExtension(compilerOptions);
                        const ext = tsExtension === ".mts" /* Mts */ || tsExtension === ".d.mts" /* Dmts */ ? preferTs ? ".mts" : ".mjs" : tsExtension === ".cts" /* Cts */ || tsExtension === ".d.mts" /* Dmts */ ? preferTs ? ".cts" : ".cjs" : preferTs ? ".ts" : ".js";
                        return importSourceWithoutExtension + ext;
                    }
                    return importSourceWithoutExtension;
                }
            }