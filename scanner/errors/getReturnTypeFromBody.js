function getReturnTypeFromBody(func, checkMode) {
                if (!func.body) {
                    return errorType;
                }
                const functionFlags = getFunctionFlags(func);
                const isAsync = (functionFlags & 2 /* Async */) !== 0;
                const isGenerator = (functionFlags & 1 /* Generator */) !== 0;
                let returnType;
                let yieldType;
                let nextType;
                let fallbackReturnType = voidType;
                if (func.body.kind !== 238 /* Block */) {
                    returnType = checkExpressionCached(func.body, checkMode && checkMode & ~8 /* SkipGenericFunctions */);
                    if (isAsync) {
                        returnType = unwrapAwaitedType(checkAwaitedType(returnType, 
                        /*withAlias*/
                        false, 
                        /*errorNode*/
                        func, Diagnostics.The_return_type_of_an_async_function_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member));
                    }
                }
                else if (isGenerator) {
                    const returnTypes = checkAndAggregateReturnExpressionTypes(func, checkMode);
                    if (!returnTypes) {
                        fallbackReturnType = neverType;
                    }
                    else if (returnTypes.length > 0) {
                        returnType = getUnionType(returnTypes, 2 /* Subtype */);
                    }
                    const { yieldTypes, nextTypes } = checkAndAggregateYieldOperandTypes(func, checkMode);
                    yieldType = some(yieldTypes) ? getUnionType(yieldTypes, 2 /* Subtype */) : void 0;
                    nextType = some(nextTypes) ? getIntersectionType(nextTypes) : void 0;
                }
                else {
                    const types = checkAndAggregateReturnExpressionTypes(func, checkMode);
                    if (!types) {
                        return functionFlags & 2 /* Async */ ? createPromiseReturnType(func, neverType) : neverType;
                    }
                    if (types.length === 0) {
                        return functionFlags & 2 /* Async */ ? createPromiseReturnType(func, voidType) : voidType;
                    }
                    returnType = getUnionType(types, 2 /* Subtype */);
                }
                if (returnType || yieldType || nextType) {
                    if (yieldType)
                        reportErrorsFromWidening(func, yieldType, 3 /* GeneratorYield */);
                    if (returnType)
                        reportErrorsFromWidening(func, returnType, 1 /* FunctionReturn */);
                    if (nextType)
                        reportErrorsFromWidening(func, nextType, 2 /* GeneratorNext */);
                    if (returnType && isUnitType(returnType) || yieldType && isUnitType(yieldType) || nextType && isUnitType(nextType)) {
                        const contextualSignature = getContextualSignatureForFunctionLikeDeclaration(func);
                        const contextualType = !contextualSignature ? void 0 : contextualSignature === getSignatureFromDeclaration(func) ? isGenerator ? void 0 : returnType : instantiateContextualType(getReturnTypeOfSignature(contextualSignature), func, 
                        /*contextFlags*/
                        void 0);
                        if (isGenerator) {
                            yieldType = getWidenedLiteralLikeTypeForContextualIterationTypeIfNeeded(yieldType, contextualType, 0 /* Yield */, isAsync);
                            returnType = getWidenedLiteralLikeTypeForContextualIterationTypeIfNeeded(returnType, contextualType, 1 /* Return */, isAsync);
                            nextType = getWidenedLiteralLikeTypeForContextualIterationTypeIfNeeded(nextType, contextualType, 2 /* Next */, isAsync);
                        }
                        else {
                            returnType = getWidenedLiteralLikeTypeForContextualReturnTypeIfNeeded(returnType, contextualType, isAsync);
                        }
                    }
                    if (yieldType)
                        yieldType = getWidenedType(yieldType);
                    if (returnType)
                        returnType = getWidenedType(returnType);
                    if (nextType)
                        nextType = getWidenedType(nextType);
                }
                if (isGenerator) {
                    return createGeneratorReturnType(yieldType || neverType, returnType || fallbackReturnType, nextType || getContextualIterationType(2 /* Next */, func) || unknownType, isAsync);
                }
                else {
                    return isAsync ? createPromiseType(returnType || fallbackReturnType) : returnType || fallbackReturnType;
                }
            }