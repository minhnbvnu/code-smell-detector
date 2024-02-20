function getAllExportInfoForSymbol(importingFile, symbol, symbolName2, moduleSymbol, preferCapitalized, program, host, preferences, cancellationToken) {
            const getChecker = createGetChecker(program, host);
            return getExportInfoMap(importingFile, host, program, preferences, cancellationToken).search(importingFile.path, preferCapitalized, (name) => name === symbolName2, (info) => {
                if (skipAlias(info[0].symbol, getChecker(info[0].isFromPackageJson)) === symbol && info.some((i) => i.moduleSymbol === moduleSymbol || i.symbol.parent === moduleSymbol)) {
                    return info;
                }
            });
        }