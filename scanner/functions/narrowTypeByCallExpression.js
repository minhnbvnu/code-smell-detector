function narrowTypeByCallExpression(type, callExpression, assumeTrue) {
                    if (hasMatchingArgument(callExpression, reference)) {
                        const signature = assumeTrue || !isCallChain(callExpression) ? getEffectsSignature(callExpression) : void 0;
                        const predicate = signature && getTypePredicateOfSignature(signature);
                        if (predicate && (predicate.kind === 0 /* This */ || predicate.kind === 1 /* Identifier */)) {
                            return narrowTypeByTypePredicate(type, predicate, callExpression, assumeTrue);
                        }
                    }
                    if (containsMissingType(type) && isAccessExpression(reference) && isPropertyAccessExpression(callExpression.expression)) {
                        const callAccess = callExpression.expression;
                        if (isMatchingReference(reference.expression, getReferenceCandidate(callAccess.expression)) && isIdentifier(callAccess.name) && callAccess.name.escapedText === "hasOwnProperty" && callExpression.arguments.length === 1) {
                            const argument = callExpression.arguments[0];
                            if (isStringLiteralLike(argument) && getAccessedPropertyName(reference) === escapeLeadingUnderscores(argument.text)) {
                                return getTypeWithFacts(type, assumeTrue ? 524288 /* NEUndefined */ : 65536 /* EQUndefined */);
                            }
                        }
                    }
                    return type;
                }