function checkYieldExpression(node) {
                addLazyDiagnostic(checkYieldExpressionGrammar);
                const func = getContainingFunction(node);
                if (!func)
                    return anyType;
                const functionFlags = getFunctionFlags(func);
                if (!(functionFlags & 1 /* Generator */)) {
                    return anyType;
                }
                const isAsync = (functionFlags & 2 /* Async */) !== 0;
                if (node.asteriskToken) {
                    if (isAsync && languageVersion < 99 /* ESNext */) {
                        checkExternalEmitHelpers(node, 26624 /* AsyncDelegatorIncludes */);
                    }
                    if (!isAsync && languageVersion < 2 /* ES2015 */ && compilerOptions.downlevelIteration) {
                        checkExternalEmitHelpers(node, 256 /* Values */);
                    }
                }
                const returnType = getReturnTypeFromAnnotation(func);
                const iterationTypes = returnType && getIterationTypesOfGeneratorFunctionReturnType(returnType, isAsync);
                const signatureYieldType = iterationTypes && iterationTypes.yieldType || anyType;
                const signatureNextType = iterationTypes && iterationTypes.nextType || anyType;
                const resolvedSignatureNextType = isAsync ? getAwaitedType(signatureNextType) || anyType : signatureNextType;
                const yieldExpressionType = node.expression ? checkExpression(node.expression) : undefinedWideningType;
                const yieldedType = getYieldedTypeOfYieldExpression(node, yieldExpressionType, resolvedSignatureNextType, isAsync);
                if (returnType && yieldedType) {
                    checkTypeAssignableToAndOptionallyElaborate(yieldedType, signatureYieldType, node.expression || node, node.expression);
                }
                if (node.asteriskToken) {
                    const use = isAsync ? 19 /* AsyncYieldStar */ : 17 /* YieldStar */;
                    return getIterationTypeOfIterable(use, 1 /* Return */, yieldExpressionType, node.expression) || anyType;
                }
                else if (returnType) {
                    return getIterationTypeOfGeneratorFunctionReturnType(2 /* Next */, returnType, isAsync) || anyType;
                }
                let type = getContextualIterationType(2 /* Next */, func);
                if (!type) {
                    type = anyType;
                    addLazyDiagnostic(() => {
                        if (noImplicitAny && !expressionResultIsUnused(node)) {
                            const contextualType = getContextualType2(node, 
                            /*contextFlags*/
                            void 0);
                            if (!contextualType || isTypeAny(contextualType)) {
                                error(node, Diagnostics.yield_expression_implicitly_results_in_an_any_type_because_its_containing_generator_lacks_a_return_type_annotation);
                            }
                        }
                    });
                }
                return type;
                function checkYieldExpressionGrammar() {
                    if (!(node.flags & 8192 /* YieldContext */)) {
                        grammarErrorOnFirstToken(node, Diagnostics.A_yield_expression_is_only_allowed_in_a_generator_body);
                    }
                    if (isInParameterInitializerBeforeContainingFunction(node)) {
                        error(node, Diagnostics.yield_expressions_cannot_be_used_in_a_parameter_initializer);
                    }
                }
            }