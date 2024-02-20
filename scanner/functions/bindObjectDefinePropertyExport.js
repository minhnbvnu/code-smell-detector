function bindObjectDefinePropertyExport(node) {
                if (!setCommonJsModuleIndicator(node)) {
                    return;
                }
                const symbol = forEachIdentifierInEntityName(node.arguments[0], 
                /*parent*/
                void 0, (id, symbol2) => {
                    if (symbol2) {
                        addDeclarationToSymbol(symbol2, id, 1536 /* Module */ | 67108864 /* Assignment */);
                    }
                    return symbol2;
                });
                if (symbol) {
                    const flags = 4 /* Property */ | 1048576 /* ExportValue */;
                    declareSymbol(symbol.exports, symbol, node, flags, 0 /* None */);
                }
            }