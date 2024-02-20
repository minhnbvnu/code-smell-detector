function contextuallyCheckFunctionExpressionOrObjectLiteralMethod(node, checkMode) {
                const links = getNodeLinks(node);
                if (!(links.flags & 64 /* ContextChecked */)) {
                    const contextualSignature = getContextualSignature(node);
                    if (!(links.flags & 64 /* ContextChecked */)) {
                        links.flags |= 64 /* ContextChecked */;
                        const signature = firstOrUndefined(getSignaturesOfType(getTypeOfSymbol(getSymbolOfDeclaration(node)), 0 /* Call */));
                        if (!signature) {
                            return;
                        }
                        if (isContextSensitive(node)) {
                            if (contextualSignature) {
                                const inferenceContext = getInferenceContext(node);
                                let instantiatedContextualSignature;
                                if (checkMode && checkMode & 2 /* Inferential */) {
                                    inferFromAnnotatedParameters(signature, contextualSignature, inferenceContext);
                                    const restType = getEffectiveRestType(contextualSignature);
                                    if (restType && restType.flags & 262144 /* TypeParameter */) {
                                        instantiatedContextualSignature = instantiateSignature(contextualSignature, inferenceContext.nonFixingMapper);
                                    }
                                }
                                instantiatedContextualSignature || (instantiatedContextualSignature = inferenceContext ? instantiateSignature(contextualSignature, inferenceContext.mapper) : contextualSignature);
                                assignContextualParameterTypes(signature, instantiatedContextualSignature);
                            }
                            else {
                                assignNonContextualParameterTypes(signature);
                            }
                        }
                        if (contextualSignature && !getReturnTypeFromAnnotation(node) && !signature.resolvedReturnType) {
                            const returnType = getReturnTypeFromBody(node, checkMode);
                            if (!signature.resolvedReturnType) {
                                signature.resolvedReturnType = returnType;
                            }
                        }
                        checkSignatureDeclaration(node);
                    }
                }
            }