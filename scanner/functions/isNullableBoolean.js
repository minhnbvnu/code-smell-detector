function isNullableBoolean(expressionType) {
                if (!expressionType.isUnion()) {
                    return false;
                }
                const { types } = expressionType;
                const nonNullishTypes = types.filter(type => !tsutils.isTypeFlagSet(type, ts.TypeFlags.Undefined | ts.TypeFlags.Null));
                const hasNonNullishType = nonNullishTypes.length > 0;
                if (!hasNonNullishType) {
                    return false;
                }
                const hasNullableType = nonNullishTypes.length < types.length;
                if (!hasNullableType) {
                    return false;
                }
                const allNonNullishTypesAreBoolean = nonNullishTypes.every(isBooleanType);
                if (!allNonNullishTypesAreBoolean) {
                    return false;
                }
                return true;
            }