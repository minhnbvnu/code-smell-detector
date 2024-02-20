function getAliasForSymbolInContainer(container, symbol) {
                if (container === getParentOfSymbol(symbol)) {
                    return symbol;
                }
                const exportEquals = container.exports && container.exports.get("export=" /* ExportEquals */);
                if (exportEquals && getSymbolIfSameReference(exportEquals, symbol)) {
                    return container;
                }
                const exports = getExportsOfSymbol(container);
                const quick = exports.get(symbol.escapedName);
                if (quick && getSymbolIfSameReference(quick, symbol)) {
                    return quick;
                }
                return forEachEntry(exports, (exported) => {
                    if (getSymbolIfSameReference(exported, symbol)) {
                        return exported;
                    }
                });
            }