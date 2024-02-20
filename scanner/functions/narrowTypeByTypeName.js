function narrowTypeByTypeName(type, typeName) {
                    switch (typeName) {
                        case "string":
                            return narrowTypeByTypeFacts(type, stringType, 1 /* TypeofEQString */);
                        case "number":
                            return narrowTypeByTypeFacts(type, numberType, 2 /* TypeofEQNumber */);
                        case "bigint":
                            return narrowTypeByTypeFacts(type, bigintType, 4 /* TypeofEQBigInt */);
                        case "boolean":
                            return narrowTypeByTypeFacts(type, booleanType, 8 /* TypeofEQBoolean */);
                        case "symbol":
                            return narrowTypeByTypeFacts(type, esSymbolType, 16 /* TypeofEQSymbol */);
                        case "object":
                            return type.flags & 1 /* Any */ ? type : getUnionType([narrowTypeByTypeFacts(type, nonPrimitiveType, 32 /* TypeofEQObject */), narrowTypeByTypeFacts(type, nullType, 131072 /* EQNull */)]);
                        case "function":
                            return type.flags & 1 /* Any */ ? type : narrowTypeByTypeFacts(type, globalFunctionType, 64 /* TypeofEQFunction */);
                        case "undefined":
                            return narrowTypeByTypeFacts(type, undefinedType, 65536 /* EQUndefined */);
                    }
                    return narrowTypeByTypeFacts(type, nonPrimitiveType, 128 /* TypeofEQHostObject */);
                }