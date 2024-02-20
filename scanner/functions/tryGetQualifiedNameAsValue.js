function tryGetQualifiedNameAsValue(node) {
                let left = getFirstIdentifier(node);
                let symbol = resolveName(left, left.escapedText, 111551 /* Value */, void 0, left, 
                /*isUse*/
                true);
                if (!symbol) {
                    return void 0;
                }
                while (isQualifiedName(left.parent)) {
                    const type = getTypeOfSymbol(symbol);
                    symbol = getPropertyOfType(type, left.parent.right.escapedText);
                    if (!symbol) {
                        return void 0;
                    }
                    left = left.parent;
                }
                return symbol;
            }