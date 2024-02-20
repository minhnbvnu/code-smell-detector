function checkUnusedLocalsAndParameters(nodeWithLocals, addDiagnostic) {
                const unusedImports = /* @__PURE__ */ new Map();
                const unusedDestructures = /* @__PURE__ */ new Map();
                const unusedVariables = /* @__PURE__ */ new Map();
                nodeWithLocals.locals.forEach((local) => {
                    if (local.flags & 262144 /* TypeParameter */ ? !(local.flags & 3 /* Variable */ && !(local.isReferenced & 3 /* Variable */)) : local.isReferenced || local.exportSymbol) {
                        return;
                    }
                    if (local.declarations) {
                        for (const declaration of local.declarations) {
                            if (isValidUnusedLocalDeclaration(declaration)) {
                                continue;
                            }
                            if (isImportedDeclaration(declaration)) {
                                addToGroup(unusedImports, importClauseFromImported(declaration), declaration, getNodeId);
                            }
                            else if (isBindingElement(declaration) && isObjectBindingPattern(declaration.parent)) {
                                const lastElement = last(declaration.parent.elements);
                                if (declaration === lastElement || !last(declaration.parent.elements).dotDotDotToken) {
                                    addToGroup(unusedDestructures, declaration.parent, declaration, getNodeId);
                                }
                            }
                            else if (isVariableDeclaration(declaration)) {
                                addToGroup(unusedVariables, declaration.parent, declaration, getNodeId);
                            }
                            else {
                                const parameter = local.valueDeclaration && tryGetRootParameterDeclaration(local.valueDeclaration);
                                const name = local.valueDeclaration && getNameOfDeclaration(local.valueDeclaration);
                                if (parameter && name) {
                                    if (!isParameterPropertyDeclaration(parameter, parameter.parent) && !parameterIsThisKeyword(parameter) && !isIdentifierThatStartsWithUnderscore(name)) {
                                        if (isBindingElement(declaration) && isArrayBindingPattern(declaration.parent)) {
                                            addToGroup(unusedDestructures, declaration.parent, declaration, getNodeId);
                                        }
                                        else {
                                            addDiagnostic(parameter, 1 /* Parameter */, createDiagnosticForNode(name, Diagnostics._0_is_declared_but_its_value_is_never_read, symbolName(local)));
                                        }
                                    }
                                }
                                else {
                                    errorUnusedLocal(declaration, symbolName(local), addDiagnostic);
                                }
                            }
                        }
                    }
                });
                unusedImports.forEach(([importClause, unuseds]) => {
                    const importDecl = importClause.parent;
                    const nDeclarations = (importClause.name ? 1 : 0) + (importClause.namedBindings ? importClause.namedBindings.kind === 271 /* NamespaceImport */ ? 1 : importClause.namedBindings.elements.length : 0);
                    if (nDeclarations === unuseds.length) {
                        addDiagnostic(importDecl, 0 /* Local */, unuseds.length === 1 ? createDiagnosticForNode(importDecl, Diagnostics._0_is_declared_but_its_value_is_never_read, idText(first(unuseds).name)) : createDiagnosticForNode(importDecl, Diagnostics.All_imports_in_import_declaration_are_unused));
                    }
                    else {
                        for (const unused of unuseds)
                            errorUnusedLocal(unused, idText(unused.name), addDiagnostic);
                    }
                });
                unusedDestructures.forEach(([bindingPattern, bindingElements]) => {
                    const kind = tryGetRootParameterDeclaration(bindingPattern.parent) ? 1 /* Parameter */ : 0 /* Local */;
                    if (bindingPattern.elements.length === bindingElements.length) {
                        if (bindingElements.length === 1 && bindingPattern.parent.kind === 257 /* VariableDeclaration */ && bindingPattern.parent.parent.kind === 258 /* VariableDeclarationList */) {
                            addToGroup(unusedVariables, bindingPattern.parent.parent, bindingPattern.parent, getNodeId);
                        }
                        else {
                            addDiagnostic(bindingPattern, kind, bindingElements.length === 1 ? createDiagnosticForNode(bindingPattern, Diagnostics._0_is_declared_but_its_value_is_never_read, bindingNameText(first(bindingElements).name)) : createDiagnosticForNode(bindingPattern, Diagnostics.All_destructured_elements_are_unused));
                        }
                    }
                    else {
                        for (const e of bindingElements) {
                            addDiagnostic(e, kind, createDiagnosticForNode(e, Diagnostics._0_is_declared_but_its_value_is_never_read, bindingNameText(e.name)));
                        }
                    }
                });
                unusedVariables.forEach(([declarationList, declarations]) => {
                    if (declarationList.declarations.length === declarations.length) {
                        addDiagnostic(declarationList, 0 /* Local */, declarations.length === 1 ? createDiagnosticForNode(first(declarations).name, Diagnostics._0_is_declared_but_its_value_is_never_read, bindingNameText(first(declarations).name)) : createDiagnosticForNode(declarationList.parent.kind === 240 /* VariableStatement */ ? declarationList.parent : declarationList, Diagnostics.All_variables_are_unused));
                    }
                    else {
                        for (const decl of declarations) {
                            addDiagnostic(decl, 0 /* Local */, createDiagnosticForNode(decl, Diagnostics._0_is_declared_but_its_value_is_never_read, bindingNameText(decl.name)));
                        }
                    }
                });
            }