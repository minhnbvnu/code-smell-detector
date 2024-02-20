function hasVisibleDeclarations(symbol, shouldComputeAliasToMakeVisible) {
                let aliasesToMakeVisible;
                if (!every(filter(symbol.declarations, (d) => d.kind !== 79 /* Identifier */), getIsDeclarationVisible)) {
                    return void 0;
                }
                return { accessibility: 0 /* Accessible */, aliasesToMakeVisible };
                function getIsDeclarationVisible(declaration) {
                    var _a2, _b;
                    if (!isDeclarationVisible(declaration)) {
                        const anyImportSyntax = getAnyImportSyntax(declaration);
                        if (anyImportSyntax && !hasSyntacticModifier(anyImportSyntax, 1 /* Export */) && // import clause without export
                            isDeclarationVisible(anyImportSyntax.parent)) {
                            return addVisibleAlias(declaration, anyImportSyntax);
                        }
                        else if (isVariableDeclaration(declaration) && isVariableStatement(declaration.parent.parent) && !hasSyntacticModifier(declaration.parent.parent, 1 /* Export */) && // unexported variable statement
                            isDeclarationVisible(declaration.parent.parent.parent)) {
                            return addVisibleAlias(declaration, declaration.parent.parent);
                        }
                        else if (isLateVisibilityPaintedStatement(declaration) && !hasSyntacticModifier(declaration, 1 /* Export */) && isDeclarationVisible(declaration.parent)) {
                            return addVisibleAlias(declaration, declaration);
                        }
                        else if (isBindingElement(declaration)) {
                            if (symbol.flags & 2097152 /* Alias */ && isInJSFile(declaration) && ((_a2 = declaration.parent) == null ? void 0 : _a2.parent) && isVariableDeclaration(declaration.parent.parent) && ((_b = declaration.parent.parent.parent) == null ? void 0 : _b.parent) && isVariableStatement(declaration.parent.parent.parent.parent) && !hasSyntacticModifier(declaration.parent.parent.parent.parent, 1 /* Export */) && declaration.parent.parent.parent.parent.parent && isDeclarationVisible(declaration.parent.parent.parent.parent.parent)) {
                                return addVisibleAlias(declaration, declaration.parent.parent.parent.parent);
                            }
                            else if (symbol.flags & 2 /* BlockScopedVariable */) {
                                const variableStatement = findAncestor(declaration, isVariableStatement);
                                if (hasSyntacticModifier(variableStatement, 1 /* Export */)) {
                                    return true;
                                }
                                if (!isDeclarationVisible(variableStatement.parent)) {
                                    return false;
                                }
                                return addVisibleAlias(declaration, variableStatement);
                            }
                        }
                        return false;
                    }
                    return true;
                }
                function addVisibleAlias(declaration, aliasingStatement) {
                    if (shouldComputeAliasToMakeVisible) {
                        getNodeLinks(declaration).isVisible = true;
                        aliasesToMakeVisible = appendIfUnique(aliasesToMakeVisible, aliasingStatement);
                    }
                    return true;
                }
            }