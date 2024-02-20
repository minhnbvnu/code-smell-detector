function getGlobalTypeOrUndefined(name, arity = 0) {
                const symbol = getGlobalSymbol(name, 788968 /* Type */, 
                /*diagnostic*/
                void 0);
                return symbol && getTypeOfGlobalSymbol(symbol, arity);
            }