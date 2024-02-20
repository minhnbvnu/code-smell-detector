function emitIdentifier(node) {
                const writeText = node.symbol ? writeSymbol : write;
                writeText(getTextOfNode2(node, 
                /*includeTrivia*/
                false), node.symbol);
                emitList(node, getIdentifierTypeArguments(node), 53776 /* TypeParameters */);
            }