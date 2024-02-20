function getExportSymbolOfValueSymbolIfExported(symbol) {
                return getMergedSymbol(symbol && (symbol.flags & 1048576 /* ExportValue */) !== 0 && symbol.exportSymbol || symbol);
            }