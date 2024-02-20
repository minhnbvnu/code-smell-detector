function makeSingleImport(localName, propertyName, moduleSpecifier, quotePreference) {
            return propertyName === "default" ? makeImport(factory.createIdentifier(localName), 
            /*namedImports*/
            void 0, moduleSpecifier, quotePreference) : makeImport(
            /*name*/
            void 0, [makeImportSpecifier(propertyName, localName)], moduleSpecifier, quotePreference);
        }