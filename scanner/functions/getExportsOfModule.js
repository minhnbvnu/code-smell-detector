function getExportsOfModule(moduleSymbol) {
                const links = getSymbolLinks(moduleSymbol);
                if (!links.resolvedExports) {
                    const { exports, typeOnlyExportStarMap } = getExportsOfModuleWorker(moduleSymbol);
                    links.resolvedExports = exports;
                    links.typeOnlyExportStarMap = typeOnlyExportStarMap;
                }
                return links.resolvedExports;
            }