function appendExportsOfImportDeclaration(statements, decl) {
                if (moduleInfo.exportEquals) {
                    return statements;
                }
                const importClause = decl.importClause;
                if (!importClause) {
                    return statements;
                }
                if (importClause.name) {
                    statements = appendExportsOfDeclaration(statements, importClause);
                }
                const namedBindings = importClause.namedBindings;
                if (namedBindings) {
                    switch (namedBindings.kind) {
                        case 271 /* NamespaceImport */:
                            statements = appendExportsOfDeclaration(statements, namedBindings);
                            break;
                        case 272 /* NamedImports */:
                            for (const importBinding of namedBindings.elements) {
                                statements = appendExportsOfDeclaration(statements, importBinding);
                            }
                            break;
                    }
                }
                return statements;
            }