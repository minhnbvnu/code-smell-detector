function updateImportDeclarationAndClause(importDeclaration, name, namedBindings) {
            return factory.updateImportDeclaration(importDeclaration, importDeclaration.modifiers, factory.updateImportClause(importDeclaration.importClause, importDeclaration.importClause.isTypeOnly, name, namedBindings), 
            // TODO: GH#18217
            importDeclaration.moduleSpecifier, importDeclaration.assertClause);
        }