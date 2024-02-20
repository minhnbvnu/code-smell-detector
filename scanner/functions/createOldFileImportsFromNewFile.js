function createOldFileImportsFromNewFile(sourceFile, newFileNeedExport, newFileNameWithExtension, program, host, useEs6Imports, quotePreference) {
            let defaultImport;
            const imports = [];
            newFileNeedExport.forEach((symbol) => {
                if (symbol.escapedName === "default" /* Default */) {
                    defaultImport = factory.createIdentifier(symbolNameNoDefault(symbol));
                }
                else {
                    imports.push(symbol.name);
                }
            });
            return makeImportOrRequire(sourceFile, defaultImport, imports, newFileNameWithExtension, program, host, useEs6Imports, quotePreference);
        }