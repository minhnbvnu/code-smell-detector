function narrowTypeByOptionalChainContainment(type, operator, value, assumeTrue) {
                    const equalsOperator = operator === 34 /* EqualsEqualsToken */ || operator === 36 /* EqualsEqualsEqualsToken */;
                    const nullableFlags = operator === 34 /* EqualsEqualsToken */ || operator === 35 /* ExclamationEqualsToken */ ? 98304 /* Nullable */ : 32768 /* Undefined */;
                    const valueType = getTypeOfExpression(value);
                    const removeNullable = equalsOperator !== assumeTrue && everyType(valueType, (t) => !!(t.flags & nullableFlags)) || equalsOperator === assumeTrue && everyType(valueType, (t) => !(t.flags & (3 /* AnyOrUnknown */ | nullableFlags)));
                    return removeNullable ? getAdjustedTypeWithFacts(type, 2097152 /* NEUndefinedOrNull */) : type;
                }