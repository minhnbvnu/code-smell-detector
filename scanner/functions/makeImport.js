function makeImport(defaultImport, namedImports, moduleSpecifier, quotePreference, isTypeOnly) {
            return factory.createImportDeclaration(
            /*modifiers*/
            void 0, defaultImport || namedImports ? factory.createImportClause(!!isTypeOnly, defaultImport, namedImports && namedImports.length ? factory.createNamedImports(namedImports) : void 0) : void 0, typeof moduleSpecifier === "string" ? makeStringLiteral(moduleSpecifier, quotePreference) : moduleSpecifier, 
            /*assertClause*/
            void 0);
        }