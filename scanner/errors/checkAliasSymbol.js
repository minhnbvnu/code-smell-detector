function checkAliasSymbol(node) {
                var _a2, _b, _c, _d, _e;
                let symbol = getSymbolOfDeclaration(node);
                const target = resolveAlias(symbol);
                if (target !== unknownSymbol) {
                    symbol = getMergedSymbol(symbol.exportSymbol || symbol);
                    if (isInJSFile(node) && !(target.flags & 111551 /* Value */) && !isTypeOnlyImportOrExportDeclaration(node)) {
                        const errorNode = isImportOrExportSpecifier(node) ? node.propertyName || node.name : isNamedDeclaration(node) ? node.name : node;
                        Debug.assert(node.kind !== 277 /* NamespaceExport */);
                        if (node.kind === 278 /* ExportSpecifier */) {
                            const diag2 = error(errorNode, Diagnostics.Types_cannot_appear_in_export_declarations_in_JavaScript_files);
                            const alreadyExportedSymbol = (_b = (_a2 = getSourceFileOfNode(node).symbol) == null ? void 0 : _a2.exports) == null ? void 0 : _b.get((node.propertyName || node.name).escapedText);
                            if (alreadyExportedSymbol === target) {
                                const exportingDeclaration = (_c = alreadyExportedSymbol.declarations) == null ? void 0 : _c.find(isJSDocNode);
                                if (exportingDeclaration) {
                                    addRelatedInfo(diag2, createDiagnosticForNode(exportingDeclaration, Diagnostics._0_is_automatically_exported_here, unescapeLeadingUnderscores(alreadyExportedSymbol.escapedName)));
                                }
                            }
                        }
                        else {
                            Debug.assert(node.kind !== 257 /* VariableDeclaration */);
                            const importDeclaration = findAncestor(node, or(isImportDeclaration, isImportEqualsDeclaration));
                            const moduleSpecifier = (_e = importDeclaration && ((_d = tryGetModuleSpecifierFromDeclaration(importDeclaration)) == null ? void 0 : _d.text)) != null ? _e : "...";
                            const importedIdentifier = unescapeLeadingUnderscores(isIdentifier(errorNode) ? errorNode.escapedText : symbol.escapedName);
                            error(errorNode, Diagnostics._0_is_a_type_and_cannot_be_imported_in_JavaScript_files_Use_1_in_a_JSDoc_type_annotation, importedIdentifier, `import("${moduleSpecifier}").${importedIdentifier}`);
                        }
                        return;
                    }
                    const targetFlags = getAllSymbolFlags(target);
                    const excludedMeanings = (symbol.flags & (111551 /* Value */ | 1048576 /* ExportValue */) ? 111551 /* Value */ : 0) | (symbol.flags & 788968 /* Type */ ? 788968 /* Type */ : 0) | (symbol.flags & 1920 /* Namespace */ ? 1920 /* Namespace */ : 0);
                    if (targetFlags & excludedMeanings) {
                        const message = node.kind === 278 /* ExportSpecifier */ ? Diagnostics.Export_declaration_conflicts_with_exported_declaration_of_0 : Diagnostics.Import_declaration_conflicts_with_local_declaration_of_0;
                        error(node, message, symbolToString(symbol));
                    }
                    if (getIsolatedModules(compilerOptions) && !isTypeOnlyImportOrExportDeclaration(node) && !(node.flags & 16777216 /* Ambient */)) {
                        const typeOnlyAlias = getTypeOnlyAliasDeclaration(symbol);
                        const isType = !(targetFlags & 111551 /* Value */);
                        if (isType || typeOnlyAlias) {
                            switch (node.kind) {
                                case 270 /* ImportClause */:
                                case 273 /* ImportSpecifier */:
                                case 268 /* ImportEqualsDeclaration */: {
                                    if (compilerOptions.preserveValueImports || compilerOptions.verbatimModuleSyntax) {
                                        Debug.assertIsDefined(node.name, "An ImportClause with a symbol should have a name");
                                        const message = compilerOptions.verbatimModuleSyntax && isInternalModuleImportEqualsDeclaration(node) ? Diagnostics.An_import_alias_cannot_resolve_to_a_type_or_type_only_declaration_when_verbatimModuleSyntax_is_enabled : isType ? compilerOptions.verbatimModuleSyntax ? Diagnostics._0_is_a_type_and_must_be_imported_using_a_type_only_import_when_verbatimModuleSyntax_is_enabled : Diagnostics._0_is_a_type_and_must_be_imported_using_a_type_only_import_when_preserveValueImports_and_isolatedModules_are_both_enabled : compilerOptions.verbatimModuleSyntax ? Diagnostics._0_resolves_to_a_type_only_declaration_and_must_be_imported_using_a_type_only_import_when_verbatimModuleSyntax_is_enabled : Diagnostics._0_resolves_to_a_type_only_declaration_and_must_be_imported_using_a_type_only_import_when_preserveValueImports_and_isolatedModules_are_both_enabled;
                                        const name = idText(node.kind === 273 /* ImportSpecifier */ ? node.propertyName || node.name : node.name);
                                        addTypeOnlyDeclarationRelatedInfo(error(node, message, name), isType ? void 0 : typeOnlyAlias, name);
                                    }
                                    if (isType && node.kind === 268 /* ImportEqualsDeclaration */ && hasEffectiveModifier(node, 1 /* Export */)) {
                                        error(node, Diagnostics.Cannot_use_export_import_on_a_type_or_type_only_namespace_when_0_is_enabled, isolatedModulesLikeFlagName);
                                    }
                                    break;
                                }
                                case 278 /* ExportSpecifier */: {
                                    if (compilerOptions.verbatimModuleSyntax || getSourceFileOfNode(typeOnlyAlias) !== getSourceFileOfNode(node)) {
                                        const name = idText(node.propertyName || node.name);
                                        const diagnostic = isType ? error(node, Diagnostics.Re_exporting_a_type_when_0_is_enabled_requires_using_export_type, isolatedModulesLikeFlagName) : error(node, Diagnostics._0_resolves_to_a_type_only_declaration_and_must_be_re_exported_using_a_type_only_re_export_when_1_is_enabled, name, isolatedModulesLikeFlagName);
                                        addTypeOnlyDeclarationRelatedInfo(diagnostic, isType ? void 0 : typeOnlyAlias, name);
                                        break;
                                    }
                                }
                            }
                        }
                        if (compilerOptions.verbatimModuleSyntax && node.kind !== 268 /* ImportEqualsDeclaration */ && !isInJSFile(node) && (moduleKind === 1 /* CommonJS */ || getSourceFileOfNode(node).impliedNodeFormat === 1 /* CommonJS */)) {
                            error(node, Diagnostics.ESM_syntax_is_not_allowed_in_a_CommonJS_module_when_verbatimModuleSyntax_is_enabled);
                        }
                    }
                    if (isImportSpecifier(node)) {
                        const targetSymbol = checkDeprecatedAliasedSymbol(symbol, node);
                        if (isDeprecatedAliasedSymbol(targetSymbol) && targetSymbol.declarations) {
                            addDeprecatedSuggestion(node, targetSymbol.declarations, targetSymbol.escapedName);
                        }
                    }
                }
            }