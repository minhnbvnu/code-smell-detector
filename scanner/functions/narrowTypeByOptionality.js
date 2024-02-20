function narrowTypeByOptionality(type, expr, assumePresent) {
                    if (isMatchingReference(reference, expr)) {
                        return getAdjustedTypeWithFacts(type, assumePresent ? 2097152 /* NEUndefinedOrNull */ : 262144 /* EQUndefinedOrNull */);
                    }
                    const access = getDiscriminantPropertyAccess(expr, type);
                    if (access) {
                        return narrowTypeByDiscriminant(type, access, (t) => getTypeWithFacts(t, assumePresent ? 2097152 /* NEUndefinedOrNull */ : 262144 /* EQUndefinedOrNull */));
                    }
                    return type;
                }