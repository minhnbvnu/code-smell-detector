function getReferencedImportDeclaration(nodeIn) {
                const specifier = getIdentifierGeneratedImportReference(nodeIn);
                if (specifier) {
                    return specifier;
                }
                const node = getParseTreeNode(nodeIn, isIdentifier);
                if (node) {
                    const symbol = getReferencedValueOrAliasSymbol(node);
                    if (isNonLocalAlias(symbol, 
                    /*excludes*/
                    111551 /* Value */) && !getTypeOnlyAliasDeclaration(symbol, 111551 /* Value */)) {
                        return getDeclarationOfAliasSymbol(symbol);
                    }
                }
                return void 0;
            }