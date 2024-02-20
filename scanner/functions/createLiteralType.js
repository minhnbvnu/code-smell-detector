function createLiteralType(flags, value, symbol, regularType) {
                const type = createTypeWithSymbol(flags, symbol);
                type.value = value;
                type.regularType = regularType || type;
                return type;
            }