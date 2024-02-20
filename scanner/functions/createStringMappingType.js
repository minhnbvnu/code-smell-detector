function createStringMappingType(symbol, type) {
                const result = createTypeWithSymbol(268435456 /* StringMapping */, symbol);
                result.type = type;
                return result;
            }