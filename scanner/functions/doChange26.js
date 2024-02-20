function doChange26(changes, sourceFile, info) {
            const { allowSyntheticDefaults, defaultImportName, namedImports, statement, required } = info;
            changes.replaceNode(sourceFile, statement, defaultImportName && !allowSyntheticDefaults ? factory.createImportEqualsDeclaration(
            /*modifiers*/
            void 0, 
            /*isTypeOnly*/
            false, defaultImportName, factory.createExternalModuleReference(required)) : factory.createImportDeclaration(
            /*modifiers*/
            void 0, factory.createImportClause(
            /*isTypeOnly*/
            false, defaultImportName, namedImports), required, 
            /*assertClause*/
            void 0));
        }