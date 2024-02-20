function narrowTypeByDiscriminantProperty(type, access, operator, value, assumeTrue) {
                    if ((operator === 36 /* EqualsEqualsEqualsToken */ || operator === 37 /* ExclamationEqualsEqualsToken */) && type.flags & 1048576 /* Union */) {
                        const keyPropertyName = getKeyPropertyName(type);
                        if (keyPropertyName && keyPropertyName === getAccessedPropertyName(access)) {
                            const candidate = getConstituentTypeForKeyType(type, getTypeOfExpression(value));
                            if (candidate) {
                                return operator === (assumeTrue ? 36 /* EqualsEqualsEqualsToken */ : 37 /* ExclamationEqualsEqualsToken */) ? candidate : isUnitType(getTypeOfPropertyOfType(candidate, keyPropertyName) || unknownType) ? removeType(type, candidate) : type;
                            }
                        }
                    }
                    return narrowTypeByDiscriminant(type, access, (t) => narrowTypeByEquality(t, operator, value, assumeTrue));
                }