function isGlobalSymbolConstructor(node) {
                const symbol = getSymbolOfNode(node);
                const globalSymbol = getGlobalESSymbolConstructorTypeSymbol(
                /*reportErrors*/
                false);
                return globalSymbol && symbol && symbol === globalSymbol;
            }