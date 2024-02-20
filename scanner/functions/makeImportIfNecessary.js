function makeImportIfNecessary(defaultImport, namedImports, moduleSpecifier, quotePreference) {
            return defaultImport || namedImports && namedImports.length ? makeImport(defaultImport, namedImports, moduleSpecifier, quotePreference) : void 0;
        }