function narrowTypeByTruthiness(type, expr, assumeTrue) {
                    if (isMatchingReference(reference, expr)) {
                        return getAdjustedTypeWithFacts(type, assumeTrue ? 4194304 /* Truthy */ : 8388608 /* Falsy */);
                    }
                    if (strictNullChecks && assumeTrue && optionalChainContainsReference(expr, reference)) {
                        type = getAdjustedTypeWithFacts(type, 2097152 /* NEUndefinedOrNull */);
                    }
                    const access = getDiscriminantPropertyAccess(expr, type);
                    if (access) {
                        return narrowTypeByDiscriminant(type, access, (t) => getTypeWithFacts(t, assumeTrue ? 4194304 /* Truthy */ : 8388608 /* Falsy */));
                    }
                    return type;
                }