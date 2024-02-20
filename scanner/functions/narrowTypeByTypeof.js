function narrowTypeByTypeof(type, typeOfExpr, operator, literal, assumeTrue) {
                    if (operator === 35 /* ExclamationEqualsToken */ || operator === 37 /* ExclamationEqualsEqualsToken */) {
                        assumeTrue = !assumeTrue;
                    }
                    const target = getReferenceCandidate(typeOfExpr.expression);
                    if (!isMatchingReference(reference, target)) {
                        if (strictNullChecks && optionalChainContainsReference(target, reference) && assumeTrue === (literal.text !== "undefined")) {
                            type = getAdjustedTypeWithFacts(type, 2097152 /* NEUndefinedOrNull */);
                        }
                        const propertyAccess = getDiscriminantPropertyAccess(target, type);
                        if (propertyAccess) {
                            return narrowTypeByDiscriminant(type, propertyAccess, (t) => narrowTypeByLiteralExpression(t, literal, assumeTrue));
                        }
                        return type;
                    }
                    return narrowTypeByLiteralExpression(type, literal, assumeTrue);
                }