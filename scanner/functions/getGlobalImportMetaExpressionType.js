function getGlobalImportMetaExpressionType() {
                if (!deferredGlobalImportMetaExpressionType) {
                    const symbol = createSymbol(0 /* None */, "ImportMetaExpression");
                    const importMetaType = getGlobalImportMetaType();
                    const metaPropertySymbol = createSymbol(4 /* Property */, "meta", 8 /* Readonly */);
                    metaPropertySymbol.parent = symbol;
                    metaPropertySymbol.links.type = importMetaType;
                    const members = createSymbolTable([metaPropertySymbol]);
                    symbol.members = members;
                    deferredGlobalImportMetaExpressionType = createAnonymousType(symbol, members, emptyArray, emptyArray, emptyArray);
                }
                return deferredGlobalImportMetaExpressionType;
            }