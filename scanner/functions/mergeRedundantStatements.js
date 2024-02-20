function mergeRedundantStatements(statements) {
                        statements = flattenExportAssignedNamespace(statements);
                        statements = mergeExportDeclarations(statements);
                        statements = inlineExportModifiers(statements);
                        if (enclosingDeclaration && (isSourceFile(enclosingDeclaration) && isExternalOrCommonJsModule(enclosingDeclaration) || isModuleDeclaration(enclosingDeclaration)) && (!some(statements, isExternalModuleIndicator) || !hasScopeMarker(statements) && some(statements, needsScopeMarker))) {
                            statements.push(createEmptyExports(factory));
                        }
                        return statements;
                    }