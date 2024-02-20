function getMatchingUnionConstituentForType(unionType, type) {
                const keyPropertyName = getKeyPropertyName(unionType);
                const propType = keyPropertyName && getTypeOfPropertyOfType(type, keyPropertyName);
                return propType && getConstituentTypeForKeyType(unionType, propType);
            }