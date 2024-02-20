function getFileSymbolIfFileSymbolExportEqualsContainer(d, container) {
                const fileSymbol = getExternalModuleContainer(d);
                const exported = fileSymbol && fileSymbol.exports && fileSymbol.exports.get("export=" /* ExportEquals */);
                return exported && getSymbolIfSameReference(exported, container) ? fileSymbol : void 0;
            }