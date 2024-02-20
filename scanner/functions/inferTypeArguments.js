function inferTypeArguments(node, signature, args, checkMode, context) {
                if (isJsxOpeningLikeElement(node)) {
                    return inferJsxTypeArguments(node, signature, checkMode, context);
                }
                if (node.kind !== 167 /* Decorator */) {
                    const skipBindingPatterns = every(signature.typeParameters, (p) => !!getDefaultFromTypeParameter(p));
                    const contextualType = getContextualType2(node, skipBindingPatterns ? 8 /* SkipBindingPatterns */ : 0 /* None */);
                    if (contextualType) {
                        const inferenceTargetType = getReturnTypeOfSignature(signature);
                        if (couldContainTypeVariables(inferenceTargetType)) {
                            const outerContext = getInferenceContext(node);
                            const isFromBindingPattern = !skipBindingPatterns && getContextualType2(node, 8 /* SkipBindingPatterns */) !== contextualType;
                            if (!isFromBindingPattern) {
                                const outerMapper = getMapperFromContext(cloneInferenceContext(outerContext, 1 /* NoDefault */));
                                const instantiatedType = instantiateType(contextualType, outerMapper);
                                const contextualSignature = getSingleCallSignature(instantiatedType);
                                const inferenceSourceType = contextualSignature && contextualSignature.typeParameters ? getOrCreateTypeFromSignature(getSignatureInstantiationWithoutFillingInTypeArguments(contextualSignature, contextualSignature.typeParameters)) : instantiatedType;
                                inferTypes(context.inferences, inferenceSourceType, inferenceTargetType, 128 /* ReturnType */);
                            }
                            const returnContext = createInferenceContext(signature.typeParameters, signature, context.flags);
                            const returnSourceType = instantiateType(contextualType, outerContext && outerContext.returnMapper);
                            inferTypes(returnContext.inferences, returnSourceType, inferenceTargetType);
                            context.returnMapper = some(returnContext.inferences, hasInferenceCandidates) ? getMapperFromContext(cloneInferredPartOfContext(returnContext)) : void 0;
                        }
                    }
                }
                const restType = getNonArrayRestType(signature);
                const argCount = restType ? Math.min(getParameterCount(signature) - 1, args.length) : args.length;
                if (restType && restType.flags & 262144 /* TypeParameter */) {
                    const info = find(context.inferences, (info2) => info2.typeParameter === restType);
                    if (info) {
                        info.impliedArity = findIndex(args, isSpreadArgument, argCount) < 0 ? args.length - argCount : void 0;
                    }
                }
                const thisType = getThisTypeOfSignature(signature);
                if (thisType && couldContainTypeVariables(thisType)) {
                    const thisArgumentNode = getThisArgumentOfCall(node);
                    inferTypes(context.inferences, getThisArgumentType(thisArgumentNode), thisType);
                }
                for (let i = 0; i < argCount; i++) {
                    const arg = args[i];
                    if (arg.kind !== 229 /* OmittedExpression */ && !(checkMode & 32 /* IsForStringLiteralArgumentCompletions */ && hasSkipDirectInferenceFlag(arg))) {
                        const paramType = getTypeAtPosition(signature, i);
                        if (couldContainTypeVariables(paramType)) {
                            const argType = checkExpressionWithContextualType(arg, paramType, context, checkMode);
                            inferTypes(context.inferences, argType, paramType);
                        }
                    }
                }
                if (restType && couldContainTypeVariables(restType)) {
                    const spreadType = getSpreadArgumentType(args, argCount, args.length, restType, context, checkMode);
                    inferTypes(context.inferences, spreadType, restType);
                }
                return getInferredTypes(context);
            }