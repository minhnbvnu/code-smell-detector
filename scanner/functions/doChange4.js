function doChange4(changes, sourceFile, declaration) {
            if (isImportSpecifier(declaration)) {
                changes.replaceNode(sourceFile, declaration, factory.updateImportSpecifier(declaration, 
                /*isTypeOnly*/
                true, declaration.propertyName, declaration.name));
            }
            else {
                const importClause = declaration.importClause;
                if (importClause.name && importClause.namedBindings) {
                    changes.replaceNodeWithNodes(sourceFile, declaration, [
                        factory.createImportDeclaration(getSynthesizedDeepClones(declaration.modifiers, 
                        /*includeTrivia*/
                        true), factory.createImportClause(
                        /*isTypeOnly*/
                        true, getSynthesizedDeepClone(importClause.name, 
                        /*includeTrivia*/
                        true), 
                        /*namedBindings*/
                        void 0), getSynthesizedDeepClone(declaration.moduleSpecifier, 
                        /*includeTrivia*/
                        true), getSynthesizedDeepClone(declaration.assertClause, 
                        /*includeTrivia*/
                        true)),
                        factory.createImportDeclaration(getSynthesizedDeepClones(declaration.modifiers, 
                        /*includeTrivia*/
                        true), factory.createImportClause(
                        /*isTypeOnly*/
                        true, 
                        /*name*/
                        void 0, getSynthesizedDeepClone(importClause.namedBindings, 
                        /*includeTrivia*/
                        true)), getSynthesizedDeepClone(declaration.moduleSpecifier, 
                        /*includeTrivia*/
                        true), getSynthesizedDeepClone(declaration.assertClause, 
                        /*includeTrivia*/
                        true))
                    ]);
                }
                else {
                    const importDeclaration = factory.updateImportDeclaration(declaration, declaration.modifiers, factory.updateImportClause(importClause, 
                    /*isTypeOnly*/
                    true, importClause.name, importClause.namedBindings), declaration.moduleSpecifier, declaration.assertClause);
                    changes.replaceNode(sourceFile, declaration, importDeclaration);
                }
            }
        }