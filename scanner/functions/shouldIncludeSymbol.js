function shouldIncludeSymbol(symbol, symbolToSortTextMap2) {
                let allFlags = symbol.flags;
                if (!isSourceFile(location)) {
                    if (isExportAssignment(location.parent)) {
                        return true;
                    }
                    if (variableDeclaration && symbol.valueDeclaration === variableDeclaration) {
                        return false;
                    }
                    const symbolOrigin = skipAlias(symbol, typeChecker);
                    if (!!sourceFile.externalModuleIndicator && !compilerOptions.allowUmdGlobalAccess && symbolToSortTextMap2[getSymbolId(symbol)] === SortText.GlobalsOrKeywords && (symbolToSortTextMap2[getSymbolId(symbolOrigin)] === SortText.AutoImportSuggestions || symbolToSortTextMap2[getSymbolId(symbolOrigin)] === SortText.LocationPriority)) {
                        return false;
                    }
                    allFlags |= getCombinedLocalAndExportSymbolFlags(symbolOrigin);
                    if (isInRightSideOfInternalImportEqualsDeclaration(location)) {
                        return !!(allFlags & 1920 /* Namespace */);
                    }
                    if (isTypeOnlyLocation) {
                        return symbolCanBeReferencedAtTypeLocation(symbol, typeChecker);
                    }
                }
                return !!(allFlags & 111551 /* Value */);
            }