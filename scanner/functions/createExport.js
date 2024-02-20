function createExport(changes, program, sourceFile, names) {
            changes.insertNodeAtEndOfScope(sourceFile, sourceFile, factory.createExportDeclaration(
            /*modifiers*/
            void 0, 
            /*isTypeOnly*/
            false, factory.createNamedExports(createExportSpecifiers(names, 
            /*allowTypeModifier*/
            getIsolatedModules(program.getCompilerOptions()))), 
            /*moduleSpecifier*/
            void 0, 
            /*assertClause*/
            void 0));
        }