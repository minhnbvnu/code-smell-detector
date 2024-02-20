function updateImport(old, defaultImportName, elements) {
            return factory.createImportDeclaration(
            /*modifiers*/
            void 0, factory.createImportClause(
            /*isTypeOnly*/
            false, defaultImportName, elements && elements.length ? factory.createNamedImports(elements) : void 0), old.moduleSpecifier, 
            /*assertClause*/
            void 0);
        }