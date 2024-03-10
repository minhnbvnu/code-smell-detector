function verifyCompilerOptions() {
                if (options.strictPropertyInitialization && !getStrictOptionValue(options, "strictNullChecks")) {
                    createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "strictPropertyInitialization", "strictNullChecks");
                }
                if (options.exactOptionalPropertyTypes && !getStrictOptionValue(options, "strictNullChecks")) {
                    createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "exactOptionalPropertyTypes", "strictNullChecks");
                }
                if (options.isolatedModules || options.verbatimModuleSyntax) {
                    if (options.out) {
                        createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_with_option_1, "out", options.verbatimModuleSyntax ? "verbatimModuleSyntax" : "isolatedModules");
                    }
                    if (options.outFile) {
                        createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_with_option_1, "outFile", options.verbatimModuleSyntax ? "verbatimModuleSyntax" : "isolatedModules");
                    }
                }
                if (options.inlineSourceMap) {
                    if (options.sourceMap) {
                        createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_with_option_1, "sourceMap", "inlineSourceMap");
                    }
                    if (options.mapRoot) {
                        createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_with_option_1, "mapRoot", "inlineSourceMap");
                    }
                }
                if (options.composite) {
                    if (options.declaration === false) {
                        createDiagnosticForOptionName(Diagnostics.Composite_projects_may_not_disable_declaration_emit, "declaration");
                    }
                    if (options.incremental === false) {
                        createDiagnosticForOptionName(Diagnostics.Composite_projects_may_not_disable_incremental_compilation, "declaration");
                    }
                }
                const outputFile = outFile(options);
                if (options.tsBuildInfoFile) {
                    if (!isIncrementalCompilation(options)) {
                        createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "tsBuildInfoFile", "incremental", "composite");
                    }
                }
                else if (options.incremental && !outputFile && !options.configFilePath) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_incremental_can_only_be_specified_using_tsconfig_emitting_to_single_file_or_when_option_tsBuildInfoFile_is_specified));
                }
                verifyDeprecatedCompilerOptions();
                verifyProjectReferences();
                if (options.composite) {
                    const rootPaths = new Set(rootNames.map(toPath3));
                    for (const file of files) {
                        if (sourceFileMayBeEmitted(file, program) && !rootPaths.has(file.path)) {
                            addProgramDiagnosticExplainingFile(file, Diagnostics.File_0_is_not_listed_within_the_file_list_of_project_1_Projects_must_list_all_files_or_use_an_include_pattern, [file.fileName, options.configFilePath || ""]);
                        }
                    }
                }
                if (options.paths) {
                    for (const key in options.paths) {
                        if (!hasProperty(options.paths, key)) {
                            continue;
                        }
                        if (!hasZeroOrOneAsteriskCharacter(key)) {
                            createDiagnosticForOptionPaths(
                            /*onKey*/
                            true, key, Diagnostics.Pattern_0_can_have_at_most_one_Asterisk_character, key);
                        }
                        if (isArray(options.paths[key])) {
                            const len = options.paths[key].length;
                            if (len === 0) {
                                createDiagnosticForOptionPaths(
                                /*onKey*/
                                false, key, Diagnostics.Substitutions_for_pattern_0_shouldn_t_be_an_empty_array, key);
                            }
                            for (let i = 0; i < len; i++) {
                                const subst = options.paths[key][i];
                                const typeOfSubst = typeof subst;
                                if (typeOfSubst === "string") {
                                    if (!hasZeroOrOneAsteriskCharacter(subst)) {
                                        createDiagnosticForOptionPathKeyValue(key, i, Diagnostics.Substitution_0_in_pattern_1_can_have_at_most_one_Asterisk_character, subst, key);
                                    }
                                    if (!options.baseUrl && !pathIsRelative(subst) && !pathIsAbsolute(subst)) {
                                        createDiagnosticForOptionPathKeyValue(key, i, Diagnostics.Non_relative_paths_are_not_allowed_when_baseUrl_is_not_set_Did_you_forget_a_leading_Slash);
                                    }
                                }
                                else {
                                    createDiagnosticForOptionPathKeyValue(key, i, Diagnostics.Substitution_0_for_pattern_1_has_incorrect_type_expected_string_got_2, subst, key, typeOfSubst);
                                }
                            }
                        }
                        else {
                            createDiagnosticForOptionPaths(
                            /*onKey*/
                            false, key, Diagnostics.Substitutions_for_pattern_0_should_be_an_array, key);
                        }
                    }
                }
                if (!options.sourceMap && !options.inlineSourceMap) {
                    if (options.inlineSources) {
                        createDiagnosticForOptionName(Diagnostics.Option_0_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided, "inlineSources");
                    }
                    if (options.sourceRoot) {
                        createDiagnosticForOptionName(Diagnostics.Option_0_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided, "sourceRoot");
                    }
                }
                if (options.out && options.outFile) {
                    createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_with_option_1, "out", "outFile");
                }
                if (options.mapRoot && !(options.sourceMap || options.declarationMap)) {
                    createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "mapRoot", "sourceMap", "declarationMap");
                }
                if (options.declarationDir) {
                    if (!getEmitDeclarations(options)) {
                        createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "declarationDir", "declaration", "composite");
                    }
                    if (outputFile) {
                        createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_with_option_1, "declarationDir", options.out ? "out" : "outFile");
                    }
                }
                if (options.declarationMap && !getEmitDeclarations(options)) {
                    createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "declarationMap", "declaration", "composite");
                }
                if (options.lib && options.noLib) {
                    createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_with_option_1, "lib", "noLib");
                }
                if (options.noImplicitUseStrict && getStrictOptionValue(options, "alwaysStrict")) {
                    createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_with_option_1, "noImplicitUseStrict", "alwaysStrict");
                }
                const languageVersion = getEmitScriptTarget(options);
                const firstNonAmbientExternalModuleSourceFile = find(files, (f) => isExternalModule(f) && !f.isDeclarationFile);
                if (options.isolatedModules || options.verbatimModuleSyntax) {
                    if (options.module === 0 /* None */ && languageVersion < 2 /* ES2015 */ && options.isolatedModules) {
                        createDiagnosticForOptionName(Diagnostics.Option_isolatedModules_can_only_be_used_when_either_option_module_is_provided_or_option_target_is_ES2015_or_higher, "isolatedModules", "target");
                    }
                    if (options.preserveConstEnums === false) {
                        createDiagnosticForOptionName(Diagnostics.Option_preserveConstEnums_cannot_be_disabled_when_0_is_enabled, options.verbatimModuleSyntax ? "verbatimModuleSyntax" : "isolatedModules", "preserveConstEnums");
                    }
                }
                else if (firstNonAmbientExternalModuleSourceFile && languageVersion < 2 /* ES2015 */ && options.module === 0 /* None */) {
                    const span = getErrorSpanForNode(firstNonAmbientExternalModuleSourceFile, typeof firstNonAmbientExternalModuleSourceFile.externalModuleIndicator === "boolean" ? firstNonAmbientExternalModuleSourceFile : firstNonAmbientExternalModuleSourceFile.externalModuleIndicator);
                    programDiagnostics.add(createFileDiagnostic(firstNonAmbientExternalModuleSourceFile, span.start, span.length, Diagnostics.Cannot_use_imports_exports_or_module_augmentations_when_module_is_none));
                }
                if (outputFile && !options.emitDeclarationOnly) {
                    if (options.module && !(options.module === 2 /* AMD */ || options.module === 4 /* System */)) {
                        createDiagnosticForOptionName(Diagnostics.Only_amd_and_system_modules_are_supported_alongside_0, options.out ? "out" : "outFile", "module");
                    }
                    else if (options.module === void 0 && firstNonAmbientExternalModuleSourceFile) {
                        const span = getErrorSpanForNode(firstNonAmbientExternalModuleSourceFile, typeof firstNonAmbientExternalModuleSourceFile.externalModuleIndicator === "boolean" ? firstNonAmbientExternalModuleSourceFile : firstNonAmbientExternalModuleSourceFile.externalModuleIndicator);
                        programDiagnostics.add(createFileDiagnostic(firstNonAmbientExternalModuleSourceFile, span.start, span.length, Diagnostics.Cannot_compile_modules_using_option_0_unless_the_module_flag_is_amd_or_system, options.out ? "out" : "outFile"));
                    }
                }
                if (getResolveJsonModule(options)) {
                    if (getEmitModuleResolutionKind(options) === 1 /* Classic */) {
                        createDiagnosticForOptionName(Diagnostics.Option_resolveJsonModule_cannot_be_specified_when_moduleResolution_is_set_to_classic, "resolveJsonModule");
                    }
                    else if (!hasJsonModuleEmitEnabled(options)) {
                        createDiagnosticForOptionName(Diagnostics.Option_resolveJsonModule_can_only_be_specified_when_module_code_generation_is_commonjs_amd_es2015_or_esNext, "resolveJsonModule", "module");
                    }
                }
                if (options.outDir || // there is --outDir specified
                    options.rootDir || // there is --rootDir specified
                    options.sourceRoot || // there is --sourceRoot specified
                    options.mapRoot) {
                    const dir = getCommonSourceDirectory2();
                    if (options.outDir && dir === "" && files.some((file) => getRootLength(file.fileName) > 1)) {
                        createDiagnosticForOptionName(Diagnostics.Cannot_find_the_common_subdirectory_path_for_the_input_files, "outDir");
                    }
                }
                if (options.useDefineForClassFields && languageVersion === 0 /* ES3 */) {
                    createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_when_option_target_is_ES3, "useDefineForClassFields");
                }
                if (options.checkJs && !getAllowJSCompilerOption(options)) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "checkJs", "allowJs"));
                }
                if (options.emitDeclarationOnly) {
                    if (!getEmitDeclarations(options)) {
                        createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "emitDeclarationOnly", "declaration", "composite");
                    }
                    if (options.noEmit) {
                        createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_with_option_1, "emitDeclarationOnly", "noEmit");
                    }
                }
                if (options.emitDecoratorMetadata && !options.experimentalDecorators) {
                    createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "emitDecoratorMetadata", "experimentalDecorators");
                }
                if (options.jsxFactory) {
                    if (options.reactNamespace) {
                        createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_with_option_1, "reactNamespace", "jsxFactory");
                    }
                    if (options.jsx === 4 /* ReactJSX */ || options.jsx === 5 /* ReactJSXDev */) {
                        createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "jsxFactory", inverseJsxOptionMap.get("" + options.jsx));
                    }
                    if (!parseIsolatedEntityName(options.jsxFactory, languageVersion)) {
                        createOptionValueDiagnostic("jsxFactory", Diagnostics.Invalid_value_for_jsxFactory_0_is_not_a_valid_identifier_or_qualified_name, options.jsxFactory);
                    }
                }
                else if (options.reactNamespace && !isIdentifierText(options.reactNamespace, languageVersion)) {
                    createOptionValueDiagnostic("reactNamespace", Diagnostics.Invalid_value_for_reactNamespace_0_is_not_a_valid_identifier, options.reactNamespace);
                }
                if (options.jsxFragmentFactory) {
                    if (!options.jsxFactory) {
                        createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "jsxFragmentFactory", "jsxFactory");
                    }
                    if (options.jsx === 4 /* ReactJSX */ || options.jsx === 5 /* ReactJSXDev */) {
                        createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "jsxFragmentFactory", inverseJsxOptionMap.get("" + options.jsx));
                    }
                    if (!parseIsolatedEntityName(options.jsxFragmentFactory, languageVersion)) {
                        createOptionValueDiagnostic("jsxFragmentFactory", Diagnostics.Invalid_value_for_jsxFragmentFactory_0_is_not_a_valid_identifier_or_qualified_name, options.jsxFragmentFactory);
                    }
                }
                if (options.reactNamespace) {
                    if (options.jsx === 4 /* ReactJSX */ || options.jsx === 5 /* ReactJSXDev */) {
                        createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "reactNamespace", inverseJsxOptionMap.get("" + options.jsx));
                    }
                }
                if (options.jsxImportSource) {
                    if (options.jsx === 2 /* React */) {
                        createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "jsxImportSource", inverseJsxOptionMap.get("" + options.jsx));
                    }
                }
                if (options.preserveValueImports && getEmitModuleKind(options) < 5 /* ES2015 */) {
                    createDiagnosticForOptionName(Diagnostics.Option_0_can_only_be_used_when_module_is_set_to_es2015_or_later, "preserveValueImports");
                }
                const moduleKind = getEmitModuleKind(options);
                if (options.verbatimModuleSyntax) {
                    if (moduleKind === 2 /* AMD */ || moduleKind === 3 /* UMD */ || moduleKind === 4 /* System */) {
                        createDiagnosticForOptionName(Diagnostics.Option_verbatimModuleSyntax_cannot_be_used_when_module_is_set_to_UMD_AMD_or_System, "verbatimModuleSyntax");
                    }
                    if (options.preserveValueImports) {
                        createRedundantOptionDiagnostic("preserveValueImports", "verbatimModuleSyntax");
                    }
                    if (options.importsNotUsedAsValues) {
                        createRedundantOptionDiagnostic("importsNotUsedAsValues", "verbatimModuleSyntax");
                    }
                }
                if (options.allowImportingTsExtensions && !(options.noEmit || options.emitDeclarationOnly)) {
                    createOptionValueDiagnostic("allowImportingTsExtensions", Diagnostics.Option_allowImportingTsExtensions_can_only_be_used_when_either_noEmit_or_emitDeclarationOnly_is_set);
                }
                const moduleResolution = getEmitModuleResolutionKind(options);
                if (options.resolvePackageJsonExports && !moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution)) {
                    createDiagnosticForOptionName(Diagnostics.Option_0_can_only_be_used_when_moduleResolution_is_set_to_node16_nodenext_or_bundler, "resolvePackageJsonExports");
                }
                if (options.resolvePackageJsonImports && !moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution)) {
                    createDiagnosticForOptionName(Diagnostics.Option_0_can_only_be_used_when_moduleResolution_is_set_to_node16_nodenext_or_bundler, "resolvePackageJsonImports");
                }
                if (options.customConditions && !moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution)) {
                    createDiagnosticForOptionName(Diagnostics.Option_0_can_only_be_used_when_moduleResolution_is_set_to_node16_nodenext_or_bundler, "customConditions");
                }
                if (moduleResolution === 100 /* Bundler */ && !emitModuleKindIsNonNodeESM(moduleKind)) {
                    createOptionValueDiagnostic("moduleResolution", Diagnostics.Option_0_can_only_be_used_when_module_is_set_to_es2015_or_later, "bundler");
                }
                if (!options.noEmit && !options.suppressOutputPathCheck) {
                    const emitHost = getEmitHost();
                    const emitFilesSeen = /* @__PURE__ */ new Set();
                    forEachEmittedFile(emitHost, (emitFileNames) => {
                        if (!options.emitDeclarationOnly) {
                            verifyEmitFilePath(emitFileNames.jsFilePath, emitFilesSeen);
                        }
                        verifyEmitFilePath(emitFileNames.declarationFilePath, emitFilesSeen);
                    });
                }
                function verifyEmitFilePath(emitFileName, emitFilesSeen) {
                    if (emitFileName) {
                        const emitFilePath = toPath3(emitFileName);
                        if (filesByName.has(emitFilePath)) {
                            let chain;
                            if (!options.configFilePath) {
                                chain = chainDiagnosticMessages(
                                /*details*/
                                void 0, Diagnostics.Adding_a_tsconfig_json_file_will_help_organize_projects_that_contain_both_TypeScript_and_JavaScript_files_Learn_more_at_https_Colon_Slash_Slashaka_ms_Slashtsconfig);
                            }
                            chain = chainDiagnosticMessages(chain, Diagnostics.Cannot_write_file_0_because_it_would_overwrite_input_file, emitFileName);
                            blockEmittingOfFile(emitFileName, createCompilerDiagnosticFromMessageChain(chain));
                        }
                        const emitFileKey = !host.useCaseSensitiveFileNames() ? toFileNameLowerCase(emitFilePath) : emitFilePath;
                        if (emitFilesSeen.has(emitFileKey)) {
                            blockEmittingOfFile(emitFileName, createCompilerDiagnostic(Diagnostics.Cannot_write_file_0_because_it_would_be_overwritten_by_multiple_input_files, emitFileName));
                        }
                        else {
                            emitFilesSeen.add(emitFileKey);
                        }
                    }
                }
            }