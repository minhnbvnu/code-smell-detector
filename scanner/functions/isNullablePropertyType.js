function isNullablePropertyType(objType, propertyType) {
                if (propertyType.isUnion()) {
                    return propertyType.types.some(type => isNullablePropertyType(objType, type));
                }
                if (propertyType.isNumberLiteral() || propertyType.isStringLiteral()) {
                    const propType = (0, util_1.getTypeOfPropertyOfName)(checker, objType, propertyType.value.toString());
                    if (propType) {
                        return (0, util_1.isNullableType)(propType, { allowUndefined: true });
                    }
                }
                const typeName = (0, util_1.getTypeName)(checker, propertyType);
                return !!((typeName === 'string' &&
                    checker.getIndexInfoOfType(objType, ts.IndexKind.String)) ||
                    (typeName === 'number' &&
                        checker.getIndexInfoOfType(objType, ts.IndexKind.Number)));
            }