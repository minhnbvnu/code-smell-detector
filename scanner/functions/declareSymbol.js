function declareSymbol(symbolTable, parent3, node, includes, excludes, isReplaceableByMethod, isComputedName) {
                Debug.assert(isComputedName || !hasDynamicName(node));
                const isDefaultExport = hasSyntacticModifier(node, 1024 /* Default */) || isExportSpecifier(node) && node.name.escapedText === "default";
                const name = isComputedName ? "__computed" /* Computed */ : isDefaultExport && parent3 ? "default" /* Default */ : getDeclarationName(node);
                let symbol;
                if (name === void 0) {
                    symbol = createSymbol(0 /* None */, "__missing" /* Missing */);
                }
                else {
                    symbol = symbolTable.get(name);
                    if (includes & 2885600 /* Classifiable */) {
                        classifiableNames.add(name);
                    }
                    if (!symbol) {
                        symbolTable.set(name, symbol = createSymbol(0 /* None */, name));
                        if (isReplaceableByMethod)
                            symbol.isReplaceableByMethod = true;
                    }
                    else if (isReplaceableByMethod && !symbol.isReplaceableByMethod) {
                        return symbol;
                    }
                    else if (symbol.flags & excludes) {
                        if (symbol.isReplaceableByMethod) {
                            symbolTable.set(name, symbol = createSymbol(0 /* None */, name));
                        }
                        else if (!(includes & 3 /* Variable */ && symbol.flags & 67108864 /* Assignment */)) {
                            if (isNamedDeclaration(node)) {
                                setParent(node.name, node);
                            }
                            let message = symbol.flags & 2 /* BlockScopedVariable */ ? Diagnostics.Cannot_redeclare_block_scoped_variable_0 : Diagnostics.Duplicate_identifier_0;
                            let messageNeedsName = true;
                            if (symbol.flags & 384 /* Enum */ || includes & 384 /* Enum */) {
                                message = Diagnostics.Enum_declarations_can_only_merge_with_namespace_or_other_enum_declarations;
                                messageNeedsName = false;
                            }
                            let multipleDefaultExports = false;
                            if (length(symbol.declarations)) {
                                if (isDefaultExport) {
                                    message = Diagnostics.A_module_cannot_have_multiple_default_exports;
                                    messageNeedsName = false;
                                    multipleDefaultExports = true;
                                }
                                else {
                                    if (symbol.declarations && symbol.declarations.length && (node.kind === 274 /* ExportAssignment */ && !node.isExportEquals)) {
                                        message = Diagnostics.A_module_cannot_have_multiple_default_exports;
                                        messageNeedsName = false;
                                        multipleDefaultExports = true;
                                    }
                                }
                            }
                            const relatedInformation = [];
                            if (isTypeAliasDeclaration(node) && nodeIsMissing(node.type) && hasSyntacticModifier(node, 1 /* Export */) && symbol.flags & (2097152 /* Alias */ | 788968 /* Type */ | 1920 /* Namespace */)) {
                                relatedInformation.push(createDiagnosticForNode2(node, Diagnostics.Did_you_mean_0, `export type { ${unescapeLeadingUnderscores(node.name.escapedText)} }`));
                            }
                            const declarationName = getNameOfDeclaration(node) || node;
                            forEach(symbol.declarations, (declaration, index) => {
                                const decl = getNameOfDeclaration(declaration) || declaration;
                                const diag3 = createDiagnosticForNode2(decl, message, messageNeedsName ? getDisplayName(declaration) : void 0);
                                file.bindDiagnostics.push(multipleDefaultExports ? addRelatedInfo(diag3, createDiagnosticForNode2(declarationName, index === 0 ? Diagnostics.Another_export_default_is_here : Diagnostics.and_here)) : diag3);
                                if (multipleDefaultExports) {
                                    relatedInformation.push(createDiagnosticForNode2(decl, Diagnostics.The_first_export_default_is_here));
                                }
                            });
                            const diag2 = createDiagnosticForNode2(declarationName, message, messageNeedsName ? getDisplayName(node) : void 0);
                            file.bindDiagnostics.push(addRelatedInfo(diag2, ...relatedInformation));
                            symbol = createSymbol(0 /* None */, name);
                        }
                    }
                }
                addDeclarationToSymbol(symbol, node, includes);
                if (symbol.parent) {
                    Debug.assert(symbol.parent === parent3, "Existing symbol parent should match new one");
                }
                else {
                    symbol.parent = parent3;
                }
                return symbol;
            }