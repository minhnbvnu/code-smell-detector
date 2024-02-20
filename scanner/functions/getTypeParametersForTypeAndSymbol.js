function getTypeParametersForTypeAndSymbol(type, symbol) {
                if (!isErrorType(type)) {
                    return symbol.flags & 524288 /* TypeAlias */ && getSymbolLinks(symbol).typeParameters || (getObjectFlags(type) & 4 /* Reference */ ? type.target.localTypeParameters : void 0);
                }
                return void 0;
            }