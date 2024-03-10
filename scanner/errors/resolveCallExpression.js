function resolveCallExpression(node, candidatesOutArray, checkMode) {
                if (node.expression.kind === 106 /* SuperKeyword */) {
                    const superType = checkSuperExpression(node.expression);
                    if (isTypeAny(superType)) {
                        for (const arg of node.arguments) {
                            checkExpression(arg);
                        }
                        return anySignature;
                    }
                    if (!isErrorType(superType)) {
                        const baseTypeNode = getEffectiveBaseTypeNode(getContainingClass(node));
                        if (baseTypeNode) {
                            const baseConstructors = getInstantiatedConstructorsForTypeArguments(superType, baseTypeNode.typeArguments, baseTypeNode);
                            return resolveCall(node, baseConstructors, candidatesOutArray, checkMode, 0 /* None */);
                        }
                    }
                    return resolveUntypedCall(node);
                }
                let callChainFlags;
                let funcType = checkExpression(node.expression);
                if (isCallChain(node)) {
                    const nonOptionalType = getOptionalExpressionType(funcType, node.expression);
                    callChainFlags = nonOptionalType === funcType ? 0 /* None */ : isOutermostOptionalChain(node) ? 16 /* IsOuterCallChain */ : 8 /* IsInnerCallChain */;
                    funcType = nonOptionalType;
                }
                else {
                    callChainFlags = 0 /* None */;
                }
                funcType = checkNonNullTypeWithReporter(funcType, node.expression, reportCannotInvokePossiblyNullOrUndefinedError);
                if (funcType === silentNeverType) {
                    return silentNeverSignature;
                }
                const apparentType = getApparentType(funcType);
                if (isErrorType(apparentType)) {
                    return resolveErrorCall(node);
                }
                const callSignatures = getSignaturesOfType(apparentType, 0 /* Call */);
                const numConstructSignatures = getSignaturesOfType(apparentType, 1 /* Construct */).length;
                if (isUntypedFunctionCall(funcType, apparentType, callSignatures.length, numConstructSignatures)) {
                    if (!isErrorType(funcType) && node.typeArguments) {
                        error(node, Diagnostics.Untyped_function_calls_may_not_accept_type_arguments);
                    }
                    return resolveUntypedCall(node);
                }
                if (!callSignatures.length) {
                    if (numConstructSignatures) {
                        error(node, Diagnostics.Value_of_type_0_is_not_callable_Did_you_mean_to_include_new, typeToString(funcType));
                    }
                    else {
                        let relatedInformation;
                        if (node.arguments.length === 1) {
                            const text = getSourceFileOfNode(node).text;
                            if (isLineBreak(text.charCodeAt(skipTrivia(text, node.expression.end, 
                            /* stopAfterLineBreak */
                            true) - 1))) {
                                relatedInformation = createDiagnosticForNode(node.expression, Diagnostics.Are_you_missing_a_semicolon);
                            }
                        }
                        invocationError(node.expression, apparentType, 0 /* Call */, relatedInformation);
                    }
                    return resolveErrorCall(node);
                }
                if (checkMode & 8 /* SkipGenericFunctions */ && !node.typeArguments && callSignatures.some(isGenericFunctionReturningFunction)) {
                    skippedGenericFunction(node, checkMode);
                    return resolvingSignature;
                }
                if (callSignatures.some((sig) => isInJSFile(sig.declaration) && !!getJSDocClassTag(sig.declaration))) {
                    error(node, Diagnostics.Value_of_type_0_is_not_callable_Did_you_mean_to_include_new, typeToString(funcType));
                    return resolveErrorCall(node);
                }
                return resolveCall(node, callSignatures, candidatesOutArray, checkMode, callChainFlags);
            }