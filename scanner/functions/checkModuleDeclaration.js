function checkModuleDeclaration(node) {
                if (node.body) {
                    checkSourceElement(node.body);
                    if (!isGlobalScopeAugmentation(node)) {
                        registerForUnusedIdentifiersCheck(node);
                    }
                }
                addLazyDiagnostic(checkModuleDeclarationDiagnostics);
                function checkModuleDeclarationDiagnostics() {
                    var _a2, _b;
                    const isGlobalAugmentation = isGlobalScopeAugmentation(node);
                    const inAmbientContext = node.flags & 16777216 /* Ambient */;
                    if (isGlobalAugmentation && !inAmbientContext) {
                        error(node.name, Diagnostics.Augmentations_for_the_global_scope_should_have_declare_modifier_unless_they_appear_in_already_ambient_context);
                    }
                    const isAmbientExternalModule = isAmbientModule(node);
                    const contextErrorMessage = isAmbientExternalModule ? Diagnostics.An_ambient_module_declaration_is_only_allowed_at_the_top_level_in_a_file : Diagnostics.A_namespace_declaration_is_only_allowed_at_the_top_level_of_a_namespace_or_module;
                    if (checkGrammarModuleElementContext(node, contextErrorMessage)) {
                        return;
                    }
                    if (!checkGrammarModifiers(node)) {
                        if (!inAmbientContext && node.name.kind === 10 /* StringLiteral */) {
                            grammarErrorOnNode(node.name, Diagnostics.Only_ambient_modules_can_use_quoted_names);
                        }
                    }
                    if (isIdentifier(node.name)) {
                        checkCollisionsForDeclarationName(node, node.name);
                    }
                    checkExportsOnMergedDeclarations(node);
                    const symbol = getSymbolOfDeclaration(node);
                    if (symbol.flags & 512 /* ValueModule */ && !inAmbientContext && isInstantiatedModule(node, shouldPreserveConstEnums(compilerOptions))) {
                        if (getIsolatedModules(compilerOptions) && !getSourceFileOfNode(node).externalModuleIndicator) {
                            error(node.name, Diagnostics.Namespaces_are_not_allowed_in_global_script_files_when_0_is_enabled_If_this_file_is_not_intended_to_be_a_global_script_set_moduleDetection_to_force_or_add_an_empty_export_statement, isolatedModulesLikeFlagName);
                        }
                        if (((_a2 = symbol.declarations) == null ? void 0 : _a2.length) > 1) {
                            const firstNonAmbientClassOrFunc = getFirstNonAmbientClassOrFunctionDeclaration(symbol);
                            if (firstNonAmbientClassOrFunc) {
                                if (getSourceFileOfNode(node) !== getSourceFileOfNode(firstNonAmbientClassOrFunc)) {
                                    error(node.name, Diagnostics.A_namespace_declaration_cannot_be_in_a_different_file_from_a_class_or_function_with_which_it_is_merged);
                                }
                                else if (node.pos < firstNonAmbientClassOrFunc.pos) {
                                    error(node.name, Diagnostics.A_namespace_declaration_cannot_be_located_prior_to_a_class_or_function_with_which_it_is_merged);
                                }
                            }
                            const mergedClass = getDeclarationOfKind(symbol, 260 /* ClassDeclaration */);
                            if (mergedClass && inSameLexicalScope(node, mergedClass)) {
                                getNodeLinks(node).flags |= 2048 /* LexicalModuleMergesWithClass */;
                            }
                        }
                        if (compilerOptions.verbatimModuleSyntax && node.parent.kind === 308 /* SourceFile */ && (moduleKind === 1 /* CommonJS */ || node.parent.impliedNodeFormat === 1 /* CommonJS */)) {
                            const exportModifier = (_b = node.modifiers) == null ? void 0 : _b.find((m) => m.kind === 93 /* ExportKeyword */);
                            if (exportModifier) {
                                error(exportModifier, Diagnostics.A_top_level_export_modifier_cannot_be_used_on_value_declarations_in_a_CommonJS_module_when_verbatimModuleSyntax_is_enabled);
                            }
                        }
                    }
                    if (isAmbientExternalModule) {
                        if (isExternalModuleAugmentation(node)) {
                            const checkBody = isGlobalAugmentation || getSymbolOfDeclaration(node).flags & 33554432 /* Transient */;
                            if (checkBody && node.body) {
                                for (const statement of node.body.statements) {
                                    checkModuleAugmentationElement(statement, isGlobalAugmentation);
                                }
                            }
                        }
                        else if (isGlobalSourceFile(node.parent)) {
                            if (isGlobalAugmentation) {
                                error(node.name, Diagnostics.Augmentations_for_the_global_scope_can_only_be_directly_nested_in_external_modules_or_ambient_module_declarations);
                            }
                            else if (isExternalModuleNameRelative(getTextOfIdentifierOrLiteral(node.name))) {
                                error(node.name, Diagnostics.Ambient_module_declaration_cannot_specify_relative_module_name);
                            }
                        }
                        else {
                            if (isGlobalAugmentation) {
                                error(node.name, Diagnostics.Augmentations_for_the_global_scope_can_only_be_directly_nested_in_external_modules_or_ambient_module_declarations);
                            }
                            else {
                                error(node.name, Diagnostics.Ambient_modules_cannot_be_nested_in_other_modules_or_namespaces);
                            }
                        }
                    }
                }
            }