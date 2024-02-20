function originToCompletionEntryData(origin) {
            const ambientModuleName = origin.fileName ? void 0 : stripQuotes(origin.moduleSymbol.name);
            const isPackageJsonImport = origin.isFromPackageJson ? true : void 0;
            if (originIsResolvedExport(origin)) {
                const resolvedData = {
                    exportName: origin.exportName,
                    exportMapKey: origin.exportMapKey,
                    moduleSpecifier: origin.moduleSpecifier,
                    ambientModuleName,
                    fileName: origin.fileName,
                    isPackageJsonImport
                };
                return resolvedData;
            }
            const unresolvedData = {
                exportName: origin.exportName,
                exportMapKey: origin.exportMapKey,
                fileName: origin.fileName,
                ambientModuleName: origin.fileName ? void 0 : stripQuotes(origin.moduleSymbol.name),
                isPackageJsonImport: origin.isFromPackageJson ? true : void 0
            };
            return unresolvedData;
        }