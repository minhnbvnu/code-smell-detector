function splitTypeOnlyImport(changes, importDeclaration, context) {
            if (!importDeclaration) {
                return;
            }
            const importClause = Debug.checkDefined(importDeclaration.importClause);
            changes.replaceNode(context.sourceFile, importDeclaration, factory.updateImportDeclaration(importDeclaration, importDeclaration.modifiers, factory.updateImportClause(importClause, importClause.isTypeOnly, importClause.name, 
            /*namedBindings*/
            void 0), importDeclaration.moduleSpecifier, importDeclaration.assertClause));
            changes.insertNodeAfter(context.sourceFile, importDeclaration, factory.createImportDeclaration(
            /*modifiers*/
            void 0, factory.updateImportClause(importClause, importClause.isTypeOnly, 
            /*name*/
            void 0, importClause.namedBindings), importDeclaration.moduleSpecifier, importDeclaration.assertClause));
        }