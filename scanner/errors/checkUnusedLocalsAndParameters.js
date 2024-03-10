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