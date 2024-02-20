function createSettersArray(exportStarFunction, dependencyGroups) {
                const setters = [];
                for (const group2 of dependencyGroups) {
                    const localName = forEach(group2.externalImports, (i) => getLocalNameForExternalImport(factory2, i, currentSourceFile));
                    const parameterName = localName ? factory2.getGeneratedNameForNode(localName) : factory2.createUniqueName("");
                    const statements = [];
                    for (const entry of group2.externalImports) {
                        const importVariableName = getLocalNameForExternalImport(factory2, entry, currentSourceFile);
                        switch (entry.kind) {
                            case 269 /* ImportDeclaration */:
                                if (!entry.importClause) {
                                    break;
                                }
                            case 268 /* ImportEqualsDeclaration */:
                                Debug.assert(importVariableName !== void 0);
                                statements.push(factory2.createExpressionStatement(factory2.createAssignment(importVariableName, parameterName)));
                                if (hasSyntacticModifier(entry, 1 /* Export */)) {
                                    statements.push(factory2.createExpressionStatement(factory2.createCallExpression(exportFunction, 
                                    /*typeArguments*/
                                    void 0, [
                                        factory2.createStringLiteral(idText(importVariableName)),
                                        parameterName
                                    ])));
                                }
                                break;
                            case 275 /* ExportDeclaration */:
                                Debug.assert(importVariableName !== void 0);
                                if (entry.exportClause) {
                                    if (isNamedExports(entry.exportClause)) {
                                        const properties = [];
                                        for (const e of entry.exportClause.elements) {
                                            properties.push(factory2.createPropertyAssignment(factory2.createStringLiteral(idText(e.name)), factory2.createElementAccessExpression(parameterName, factory2.createStringLiteral(idText(e.propertyName || e.name)))));
                                        }
                                        statements.push(factory2.createExpressionStatement(factory2.createCallExpression(exportFunction, 
                                        /*typeArguments*/
                                        void 0, [factory2.createObjectLiteralExpression(properties, 
                                            /*multiline*/
                                            true)])));
                                    }
                                    else {
                                        statements.push(factory2.createExpressionStatement(factory2.createCallExpression(exportFunction, 
                                        /*typeArguments*/
                                        void 0, [
                                            factory2.createStringLiteral(idText(entry.exportClause.name)),
                                            parameterName
                                        ])));
                                    }
                                }
                                else {
                                    statements.push(factory2.createExpressionStatement(factory2.createCallExpression(exportStarFunction, 
                                    /*typeArguments*/
                                    void 0, [parameterName])));
                                }
                                break;
                        }
                    }
                    setters.push(factory2.createFunctionExpression(
                    /*modifiers*/
                    void 0, 
                    /*asteriskToken*/
                    void 0, 
                    /*name*/
                    void 0, 
                    /*typeParameters*/
                    void 0, [factory2.createParameterDeclaration(
                        /*modifiers*/
                        void 0, 
                        /*dotDotDotToken*/
                        void 0, parameterName)], 
                    /*type*/
                    void 0, factory2.createBlock(statements, 
                    /*multiLine*/
                    true)));
                }
                return factory2.createArrayLiteralExpression(setters, 
                /*multiLine*/
                true);
            }