function createTypeWithSymbol(flags, symbol) {
                const result = createType(flags);
                result.symbol = symbol;
                return result;
            }