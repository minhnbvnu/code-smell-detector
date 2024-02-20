function createCallBinding(expression, recordTempVariable, languageVersion, cacheIdentifiers = false) {
                const callee = skipOuterExpressions(expression, 15 /* All */);
                let thisArg;
                let target;
                if (isSuperProperty(callee)) {
                    thisArg = createThis();
                    target = callee;
                }
                else if (isSuperKeyword(callee)) {
                    thisArg = createThis();
                    target = languageVersion !== void 0 && languageVersion < 2 /* ES2015 */ ? setTextRange(createIdentifier("_super"), callee) : callee;
                }
                else if (getEmitFlags(callee) & 8192 /* HelperName */) {
                    thisArg = createVoidZero();
                    target = parenthesizerRules().parenthesizeLeftSideOfAccess(callee, 
                    /*optionalChain*/
                    false);
                }
                else if (isPropertyAccessExpression(callee)) {
                    if (shouldBeCapturedInTempVariable(callee.expression, cacheIdentifiers)) {
                        thisArg = createTempVariable(recordTempVariable);
                        target = createPropertyAccessExpression(setTextRange(factory2.createAssignment(thisArg, callee.expression), callee.expression), callee.name);
                        setTextRange(target, callee);
                    }
                    else {
                        thisArg = callee.expression;
                        target = callee;
                    }
                }
                else if (isElementAccessExpression(callee)) {
                    if (shouldBeCapturedInTempVariable(callee.expression, cacheIdentifiers)) {
                        thisArg = createTempVariable(recordTempVariable);
                        target = createElementAccessExpression(setTextRange(factory2.createAssignment(thisArg, callee.expression), callee.expression), callee.argumentExpression);
                        setTextRange(target, callee);
                    }
                    else {
                        thisArg = callee.expression;
                        target = callee;
                    }
                }
                else {
                    thisArg = createVoidZero();
                    target = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, 
                    /*optionalChain*/
                    false);
                }
                return { target, thisArg };
            }