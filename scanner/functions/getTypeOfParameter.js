function getTypeOfParameter(symbol) {
                const type = getTypeOfSymbol(symbol);
                if (strictNullChecks) {
                    const declaration = symbol.valueDeclaration;
                    if (declaration && hasInitializer(declaration)) {
                        return getOptionalType(type);
                    }
                }
                return type;
            }