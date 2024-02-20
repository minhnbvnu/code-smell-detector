function completionEntryDataToSymbolOriginInfo(data, completionName, moduleSymbol) {
            const isDefaultExport = data.exportName === "default" /* Default */;
            const isFromPackageJson = !!data.isPackageJsonImport;
            if (completionEntryDataIsResolved(data)) {
                const resolvedOrigin = {
                    kind: 32 /* ResolvedExport */,
                    exportName: data.exportName,
                    exportMapKey: data.exportMapKey,
                    moduleSpecifier: data.moduleSpecifier,
                    symbolName: completionName,
                    fileName: data.fileName,
                    moduleSymbol,
                    isDefaultExport,
                    isFromPackageJson
                };
                return resolvedOrigin;
            }
            const unresolvedOrigin = {
                kind: 4 /* Export */,
                exportName: data.exportName,
                exportMapKey: data.exportMapKey,
                symbolName: completionName,
                fileName: data.fileName,
                moduleSymbol,
                isDefaultExport,
                isFromPackageJson
            };
            return unresolvedOrigin;
        }