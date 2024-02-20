function reportOperatorError(isRelated) {
                    let wouldWorkWithAwait = false;
                    const errNode = errorNode || operatorToken;
                    if (isRelated) {
                        const awaitedLeftType = getAwaitedTypeNoAlias(leftType);
                        const awaitedRightType = getAwaitedTypeNoAlias(rightType);
                        wouldWorkWithAwait = !(awaitedLeftType === leftType && awaitedRightType === rightType) && !!(awaitedLeftType && awaitedRightType) && isRelated(awaitedLeftType, awaitedRightType);
                    }
                    let effectiveLeft = leftType;
                    let effectiveRight = rightType;
                    if (!wouldWorkWithAwait && isRelated) {
                        [effectiveLeft, effectiveRight] = getBaseTypesIfUnrelated(leftType, rightType, isRelated);
                    }
                    const [leftStr, rightStr] = getTypeNamesForErrorDisplay(effectiveLeft, effectiveRight);
                    if (!tryGiveBetterPrimaryError(errNode, wouldWorkWithAwait, leftStr, rightStr)) {
                        errorAndMaybeSuggestAwait(errNode, wouldWorkWithAwait, Diagnostics.Operator_0_cannot_be_applied_to_types_1_and_2, tokenToString(operatorToken.kind), leftStr, rightStr);
                    }
                }