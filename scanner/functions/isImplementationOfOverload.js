function isImplementationOfOverload(node) {
                if (nodeIsPresent(node.body)) {
                    if (isGetAccessor(node) || isSetAccessor(node))
                        return false;
                    const symbol = getSymbolOfDeclaration(node);
                    const signaturesOfSymbol = getSignaturesOfSymbol(symbol);
                    return signaturesOfSymbol.length > 1 || // If there is single signature for the symbol, it is overload if that signature isn't coming from the node
                        // e.g.: function foo(a: string): string;
                        //       function foo(a: any) { // This is implementation of the overloads
                        //           return a;
                        //       }
                        signaturesOfSymbol.length === 1 && signaturesOfSymbol[0].declaration !== node;
                }
                return false;
            }