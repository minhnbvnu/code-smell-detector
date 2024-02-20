function getNewImportSpecifiers(namedImports) {
            return flatMap(namedImports, (namedImport) => map(tryGetNamedBindingElements(namedImport), (importSpecifier) => importSpecifier.name && importSpecifier.propertyName && importSpecifier.name.escapedText === importSpecifier.propertyName.escapedText ? factory.updateImportSpecifier(importSpecifier, importSpecifier.isTypeOnly, 
            /*propertyName*/
            void 0, importSpecifier.name) : importSpecifier));
        }