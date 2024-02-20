function makeExportDeclaration(exportSpecifiers, moduleSpecifier) {
            return factory.createExportDeclaration(
            /*modifiers*/
            void 0, 
            /*isTypeOnly*/
            false, exportSpecifiers && factory.createNamedExports(exportSpecifiers), moduleSpecifier === void 0 ? void 0 : factory.createStringLiteral(moduleSpecifier));
        }