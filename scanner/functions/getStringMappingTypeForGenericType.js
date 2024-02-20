function getStringMappingTypeForGenericType(symbol, type) {
                const id = `${getSymbolId(symbol)},${getTypeId(type)}`;
                let result = stringMappingTypes.get(id);
                if (!result) {
                    stringMappingTypes.set(id, result = createStringMappingType(symbol, type));
                }
                return result;
            }