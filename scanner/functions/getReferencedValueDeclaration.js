function getReferencedValueDeclaration(referenceIn) {
                if (!isGeneratedIdentifier(referenceIn)) {
                    const reference = getParseTreeNode(referenceIn, isIdentifier);
                    if (reference) {
                        const symbol = getReferencedValueSymbol(reference);
                        if (symbol) {
                            return getExportSymbolOfValueSymbolIfExported(symbol).valueDeclaration;
                        }
                    }
                }
                return void 0;
            }