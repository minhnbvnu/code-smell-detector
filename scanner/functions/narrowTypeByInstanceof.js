function narrowTypeByInstanceof(type, expr, assumeTrue) {
                    const left = getReferenceCandidate(expr.left);
                    if (!isMatchingReference(reference, left)) {
                        if (assumeTrue && strictNullChecks && optionalChainContainsReference(left, reference)) {
                            return getAdjustedTypeWithFacts(type, 2097152 /* NEUndefinedOrNull */);
                        }
                        return type;
                    }
                    const rightType = getTypeOfExpression(expr.right);
                    if (!isTypeDerivedFrom(rightType, globalFunctionType)) {
                        return type;
                    }
                    const instanceType = mapType(rightType, getInstanceType);
                    if (isTypeAny(type) && (instanceType === globalObjectType || instanceType === globalFunctionType) || !assumeTrue && !(instanceType.flags & 524288 /* Object */ && !isEmptyAnonymousObjectType(instanceType))) {
                        return type;
                    }
                    return getNarrowedType(type, instanceType, assumeTrue, 
                    /*checkDerived*/
                    true);
                }