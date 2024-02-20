function updateImportDeclaration(node, modifiers, importClause, moduleSpecifier, assertClause) {
                return node.modifiers !== modifiers || node.importClause !== importClause || node.moduleSpecifier !== moduleSpecifier || node.assertClause !== assertClause ? update(createImportDeclaration(modifiers, importClause, moduleSpecifier, assertClause), node) : node;
            }