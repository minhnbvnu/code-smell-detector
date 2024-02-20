function getESSymbolLikeTypeForNode(node) {
                if (isValidESSymbolDeclaration(node)) {
                    const symbol = isCommonJsExportPropertyAssignment(node) ? getSymbolOfNode(node.left) : getSymbolOfNode(node);
                    if (symbol) {
                        const links = getSymbolLinks(symbol);
                        return links.uniqueESSymbolType || (links.uniqueESSymbolType = createUniqueESSymbolType(symbol));
                    }
                }
                return esSymbolType;
            }