function appendExportsOfBindingElement(statements, decl, exportSelf) {
                if (moduleInfo.exportEquals) {
                    return statements;
                }
                if (isBindingPattern(decl.name)) {
                    for (const element of decl.name.elements) {
                        if (!isOmittedExpression(element)) {
                            statements = appendExportsOfBindingElement(statements, element, exportSelf);
                        }
                    }
                }
                else if (!isGeneratedIdentifier(decl.name)) {
                    let excludeName;
                    if (exportSelf) {
                        statements = appendExportStatement(statements, decl.name, factory2.getLocalName(decl));
                        excludeName = idText(decl.name);
                    }
                    statements = appendExportsOfDeclaration(statements, decl, excludeName);
                }
                return statements;
            }