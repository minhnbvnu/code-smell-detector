function getRestArrayTypeOfTupleType(type) {
                const restType = getRestTypeOfTupleType(type);
                return restType && createArrayType(restType);
            }