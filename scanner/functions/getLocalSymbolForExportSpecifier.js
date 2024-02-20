function getLocalSymbolForExportSpecifier(referenceLocation, referenceSymbol, exportSpecifier, checker) {
                        return isExportSpecifierAlias(referenceLocation, exportSpecifier) && checker.getExportSpecifierLocalTargetSymbol(exportSpecifier) || referenceSymbol;
                    }