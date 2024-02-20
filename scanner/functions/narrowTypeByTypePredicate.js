function narrowTypeByTypePredicate(type, predicate, callExpression, assumeTrue) {
                    if (predicate.type && !(isTypeAny(type) && (predicate.type === globalObjectType || predicate.type === globalFunctionType))) {
                        const predicateArgument = getTypePredicateArgument(predicate, callExpression);
                        if (predicateArgument) {
                            if (isMatchingReference(reference, predicateArgument)) {
                                return getNarrowedType(type, predicate.type, assumeTrue, 
                                /*checkDerived*/
                                false);
                            }
                            if (strictNullChecks && assumeTrue && optionalChainContainsReference(predicateArgument, reference) && !(getTypeFacts(predicate.type) & 65536 /* EQUndefined */)) {
                                type = getAdjustedTypeWithFacts(type, 2097152 /* NEUndefinedOrNull */);
                            }
                            const access = getDiscriminantPropertyAccess(predicateArgument, type);
                            if (access) {
                                return narrowTypeByDiscriminant(type, access, (t) => getNarrowedType(t, predicate.type, assumeTrue, 
                                /*checkDerived*/
                                false));
                            }
                        }
                    }
                    return type;
                }