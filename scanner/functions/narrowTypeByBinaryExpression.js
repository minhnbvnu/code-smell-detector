function narrowTypeByBinaryExpression(type, expr, assumeTrue) {
                    switch (expr.operatorToken.kind) {
                        case 63 /* EqualsToken */:
                        case 75 /* BarBarEqualsToken */:
                        case 76 /* AmpersandAmpersandEqualsToken */:
                        case 77 /* QuestionQuestionEqualsToken */:
                            return narrowTypeByTruthiness(narrowType(type, expr.right, assumeTrue), expr.left, assumeTrue);
                        case 34 /* EqualsEqualsToken */:
                        case 35 /* ExclamationEqualsToken */:
                        case 36 /* EqualsEqualsEqualsToken */:
                        case 37 /* ExclamationEqualsEqualsToken */:
                            const operator = expr.operatorToken.kind;
                            const left = getReferenceCandidate(expr.left);
                            const right = getReferenceCandidate(expr.right);
                            if (left.kind === 218 /* TypeOfExpression */ && isStringLiteralLike(right)) {
                                return narrowTypeByTypeof(type, left, operator, right, assumeTrue);
                            }
                            if (right.kind === 218 /* TypeOfExpression */ && isStringLiteralLike(left)) {
                                return narrowTypeByTypeof(type, right, operator, left, assumeTrue);
                            }
                            if (isMatchingReference(reference, left)) {
                                return narrowTypeByEquality(type, operator, right, assumeTrue);
                            }
                            if (isMatchingReference(reference, right)) {
                                return narrowTypeByEquality(type, operator, left, assumeTrue);
                            }
                            if (strictNullChecks) {
                                if (optionalChainContainsReference(left, reference)) {
                                    type = narrowTypeByOptionalChainContainment(type, operator, right, assumeTrue);
                                }
                                else if (optionalChainContainsReference(right, reference)) {
                                    type = narrowTypeByOptionalChainContainment(type, operator, left, assumeTrue);
                                }
                            }
                            const leftAccess = getDiscriminantPropertyAccess(left, type);
                            if (leftAccess) {
                                return narrowTypeByDiscriminantProperty(type, leftAccess, operator, right, assumeTrue);
                            }
                            const rightAccess = getDiscriminantPropertyAccess(right, type);
                            if (rightAccess) {
                                return narrowTypeByDiscriminantProperty(type, rightAccess, operator, left, assumeTrue);
                            }
                            if (isMatchingConstructorReference(left)) {
                                return narrowTypeByConstructor(type, operator, right, assumeTrue);
                            }
                            if (isMatchingConstructorReference(right)) {
                                return narrowTypeByConstructor(type, operator, left, assumeTrue);
                            }
                            break;
                        case 102 /* InstanceOfKeyword */:
                            return narrowTypeByInstanceof(type, expr, assumeTrue);
                        case 101 /* InKeyword */:
                            if (isPrivateIdentifier(expr.left)) {
                                return narrowTypeByPrivateIdentifierInInExpression(type, expr, assumeTrue);
                            }
                            const target = getReferenceCandidate(expr.right);
                            const leftType = getTypeOfExpression(expr.left);
                            if (leftType.flags & 8576 /* StringOrNumberLiteralOrUnique */) {
                                if (containsMissingType(type) && isAccessExpression(reference) && isMatchingReference(reference.expression, target) && getAccessedPropertyName(reference) === getPropertyNameFromType(leftType)) {
                                    return getTypeWithFacts(type, assumeTrue ? 524288 /* NEUndefined */ : 65536 /* EQUndefined */);
                                }
                                if (isMatchingReference(reference, target)) {
                                    return narrowTypeByInKeyword(type, leftType, assumeTrue);
                                }
                            }
                            break;
                        case 27 /* CommaToken */:
                            return narrowType(type, expr.right, assumeTrue);
                        case 55 /* AmpersandAmpersandToken */:
                            return assumeTrue ? narrowType(narrowType(type, expr.left, 
                            /*assumeTrue*/
                            true), expr.right, 
                            /*assumeTrue*/
                            true) : getUnionType([narrowType(type, expr.left, 
                                /*assumeTrue*/
                                false), narrowType(type, expr.right, 
                                /*assumeTrue*/
                                false)]);
                        case 56 /* BarBarToken */:
                            return assumeTrue ? getUnionType([narrowType(type, expr.left, 
                                /*assumeTrue*/
                                true), narrowType(type, expr.right, 
                                /*assumeTrue*/
                                true)]) : narrowType(narrowType(type, expr.left, 
                            /*assumeTrue*/
                            false), expr.right, 
                            /*assumeTrue*/
                            false);
                    }
                    return type;
                }