function replaceIndexedAccess(instantiable, type, replacement) {
                return instantiateType(instantiable, createTypeMapper([type.indexType, type.objectType], [getNumberLiteralType(0), createTupleType([replacement])]));
            }