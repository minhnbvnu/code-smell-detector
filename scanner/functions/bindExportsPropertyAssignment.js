function bindExportsPropertyAssignment(node) {
                if (!setCommonJsModuleIndicator(node)) {
                    return;
                }
                const symbol = forEachIdentifierInEntityName(node.left.expression, 
                /*parent*/
                void 0, (id, symbol2) => {
                    if (symbol2) {
                        addDeclarationToSymbol(symbol2, id, 1536 /* Module */ | 67108864 /* Assignment */);
                    }
                    return symbol2;
                });
                if (symbol) {
                    const isAlias = isAliasableExpression(node.right) && (isExportsIdentifier(node.left.expression) || isModuleExportsAccessExpression(node.left.expression));
                    const flags = isAlias ? 2097152 /* Alias */ : 4 /* Property */ | 1048576 /* ExportValue */;
                    setParent(node.left, node);
                    declareSymbol(symbol.exports, symbol, node.left, flags, 0 /* None */);
                }
            }