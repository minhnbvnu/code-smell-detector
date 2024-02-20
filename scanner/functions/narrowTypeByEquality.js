function narrowTypeByEquality(type, operator, value, assumeTrue) {
                    if (type.flags & 1 /* Any */) {
                        return type;
                    }
                    if (operator === 35 /* ExclamationEqualsToken */ || operator === 37 /* ExclamationEqualsEqualsToken */) {
                        assumeTrue = !assumeTrue;
                    }
                    const valueType = getTypeOfExpression(value);
                    const doubleEquals = operator === 34 /* EqualsEqualsToken */ || operator === 35 /* ExclamationEqualsToken */;
                    if (valueType.flags & 98304 /* Nullable */) {
                        if (!strictNullChecks) {
                            return type;
                        }
                        const facts = doubleEquals ? assumeTrue ? 262144 /* EQUndefinedOrNull */ : 2097152 /* NEUndefinedOrNull */ : valueType.flags & 65536 /* Null */ ? assumeTrue ? 131072 /* EQNull */ : 1048576 /* NENull */ : assumeTrue ? 65536 /* EQUndefined */ : 524288 /* NEUndefined */;
                        return getAdjustedTypeWithFacts(type, facts);
                    }
                    if (assumeTrue) {
                        if (!doubleEquals && (type.flags & 2 /* Unknown */ || someType(type, isEmptyAnonymousObjectType))) {
                            if (valueType.flags & (134348796 /* Primitive */ | 67108864 /* NonPrimitive */) || isEmptyAnonymousObjectType(valueType)) {
                                return valueType;
                            }
                            if (valueType.flags & 524288 /* Object */) {
                                return nonPrimitiveType;
                            }
                        }
                        const filteredType = filterType(type, (t) => areTypesComparable(t, valueType) || doubleEquals && isCoercibleUnderDoubleEquals(t, valueType));
                        return replacePrimitivesWithLiterals(filteredType, valueType);
                    }
                    if (isUnitType(valueType)) {
                        return filterType(type, (t) => !(isUnitLikeType(t) && areTypesComparable(t, valueType)));
                    }
                    return type;
                }