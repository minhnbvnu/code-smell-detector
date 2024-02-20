function createComputedEnumType(symbol) {
                const regularType = createTypeWithSymbol(32 /* Enum */, symbol);
                const freshType = createTypeWithSymbol(32 /* Enum */, symbol);
                regularType.regularType = regularType;
                regularType.freshType = freshType;
                freshType.regularType = regularType;
                freshType.freshType = freshType;
                return regularType;
            }