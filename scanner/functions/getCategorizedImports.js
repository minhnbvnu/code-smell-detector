function getCategorizedImports(importGroup) {
            let importWithoutClause;
            const typeOnlyImports = { defaultImports: [], namespaceImports: [], namedImports: [] };
            const regularImports = { defaultImports: [], namespaceImports: [], namedImports: [] };
            for (const importDeclaration of importGroup) {
                if (importDeclaration.importClause === void 0) {
                    importWithoutClause = importWithoutClause || importDeclaration;
                    continue;
                }
                const group2 = importDeclaration.importClause.isTypeOnly ? typeOnlyImports : regularImports;
                const { name, namedBindings } = importDeclaration.importClause;
                if (name) {
                    group2.defaultImports.push(importDeclaration);
                }
                if (namedBindings) {
                    if (isNamespaceImport(namedBindings)) {
                        group2.namespaceImports.push(importDeclaration);
                    }
                    else {
                        group2.namedImports.push(importDeclaration);
                    }
                }
            }
            return {
                importWithoutClause,
                typeOnlyImports,
                regularImports
            };
        }