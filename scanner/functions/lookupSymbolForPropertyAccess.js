function lookupSymbolForPropertyAccess(node, lookupContainer = container) {
                if (isIdentifier(node)) {
                    return lookupSymbolForName(lookupContainer, node.escapedText);
                }
                else {
                    const symbol = lookupSymbolForPropertyAccess(node.expression);
                    return symbol && symbol.exports && symbol.exports.get(getElementOrPropertyAccessName(node));
                }
            }