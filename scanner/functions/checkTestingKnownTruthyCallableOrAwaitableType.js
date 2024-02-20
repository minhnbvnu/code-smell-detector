function checkTestingKnownTruthyCallableOrAwaitableType(condExpr, condType, body) {
                if (!strictNullChecks)
                    return;
                bothHelper(condExpr, body);
                function bothHelper(condExpr2, body2) {
                    condExpr2 = skipParentheses(condExpr2);
                    helper(condExpr2, body2);
                    while (isBinaryExpression(condExpr2) && (condExpr2.operatorToken.kind === 56 /* BarBarToken */ || condExpr2.operatorToken.kind === 60 /* QuestionQuestionToken */)) {
                        condExpr2 = skipParentheses(condExpr2.left);
                        helper(condExpr2, body2);
                    }
                }
                function helper(condExpr2, body2) {
                    const location = isLogicalOrCoalescingBinaryExpression(condExpr2) ? skipParentheses(condExpr2.right) : condExpr2;
                    if (isModuleExportsAccessExpression(location)) {
                        return;
                    }
                    if (isLogicalOrCoalescingBinaryExpression(location)) {
                        bothHelper(location, body2);
                        return;
                    }
                    const type = location === condExpr2 ? condType : checkTruthinessExpression(location);
                    const isPropertyExpressionCast = isPropertyAccessExpression(location) && isTypeAssertion(location.expression);
                    if (!(getTypeFacts(type) & 4194304 /* Truthy */) || isPropertyExpressionCast)
                        return;
                    const callSignatures = getSignaturesOfType(type, 0 /* Call */);
                    const isPromise = !!getAwaitedTypeOfPromise(type);
                    if (callSignatures.length === 0 && !isPromise) {
                        return;
                    }
                    const testedNode = isIdentifier(location) ? location : isPropertyAccessExpression(location) ? location.name : void 0;
                    const testedSymbol = testedNode && getSymbolAtLocation(testedNode);
                    if (!testedSymbol && !isPromise) {
                        return;
                    }
                    const isUsed = testedSymbol && isBinaryExpression(condExpr2.parent) && isSymbolUsedInBinaryExpressionChain(condExpr2.parent, testedSymbol) || testedSymbol && body2 && isSymbolUsedInConditionBody(condExpr2, body2, testedNode, testedSymbol);
                    if (!isUsed) {
                        if (isPromise) {
                            errorAndMaybeSuggestAwait(location, 
                            /*maybeMissingAwait*/
                            true, Diagnostics.This_condition_will_always_return_true_since_this_0_is_always_defined, getTypeNameForErrorDisplay(type));
                        }
                        else {
                            error(location, Diagnostics.This_condition_will_always_return_true_since_this_function_is_always_defined_Did_you_mean_to_call_it_instead);
                        }
                    }
                }
            }