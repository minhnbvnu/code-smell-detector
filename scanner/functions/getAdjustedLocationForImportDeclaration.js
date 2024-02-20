function getAdjustedLocationForImportDeclaration(node, forRename) {
            if (node.importClause) {
                if (node.importClause.name && node.importClause.namedBindings) {
                    return;
                }
                if (node.importClause.name) {
                    return node.importClause.name;
                }
                if (node.importClause.namedBindings) {
                    if (isNamedImports(node.importClause.namedBindings)) {
                        const onlyBinding = singleOrUndefined(node.importClause.namedBindings.elements);
                        if (!onlyBinding) {
                            return;
                        }
                        return onlyBinding.name;
                    }
                    else if (isNamespaceImport(node.importClause.namedBindings)) {
                        return node.importClause.namedBindings.name;
                    }
                }
            }
            if (!forRename) {
                return node.moduleSpecifier;
            }
        }