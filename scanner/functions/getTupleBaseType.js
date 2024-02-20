function getTupleBaseType(type) {
                const elementTypes = sameMap(type.typeParameters, (t, i) => type.elementFlags[i] & 8 /* Variadic */ ? getIndexedAccessType(t, numberType) : t);
                return createArrayType(getUnionType(elementTypes || emptyArray), type.readonly);
            }