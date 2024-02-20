function getSomeTargetNameFromDeclarations(declarations) {
                        return firstDefined(declarations, (d) => {
                            if (isImportSpecifier(d) || isExportSpecifier(d)) {
                                return idText(d.propertyName || d.name);
                            }
                            if (isBinaryExpression(d) || isExportAssignment(d)) {
                                const expression = isExportAssignment(d) ? d.expression : d.right;
                                if (isPropertyAccessExpression(expression)) {
                                    return idText(expression.name);
                                }
                            }
                            if (isAliasSymbolDeclaration2(d)) {
                                const name = getNameOfDeclaration(d);
                                if (name && isIdentifier(name)) {
                                    return idText(name);
                                }
                            }
                            return void 0;
                        });
                    }