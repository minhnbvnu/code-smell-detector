function instantiateTypeWithSingleGenericCallSignature(node, type, checkMode) {
                if (checkMode && checkMode & (2 /* Inferential */ | 8 /* SkipGenericFunctions */)) {
                    const callSignature = getSingleSignature(type, 0 /* Call */, 
                    /*allowMembers*/
                    true);
                    const constructSignature = getSingleSignature(type, 1 /* Construct */, 
                    /*allowMembers*/
                    true);
                    const signature = callSignature || constructSignature;
                    if (signature && signature.typeParameters) {
                        const contextualType = getApparentTypeOfContextualType(node, 2 /* NoConstraints */);
                        if (contextualType) {
                            const contextualSignature = getSingleSignature(getNonNullableType(contextualType), callSignature ? 0 /* Call */ : 1 /* Construct */, 
                            /*allowMembers*/
                            false);
                            if (contextualSignature && !contextualSignature.typeParameters) {
                                if (checkMode & 8 /* SkipGenericFunctions */) {
                                    skippedGenericFunction(node, checkMode);
                                    return anyFunctionType;
                                }
                                const context = getInferenceContext(node);
                                const returnType = context.signature && getReturnTypeOfSignature(context.signature);
                                const returnSignature = returnType && getSingleCallOrConstructSignature(returnType);
                                if (returnSignature && !returnSignature.typeParameters && !every(context.inferences, hasInferenceCandidates)) {
                                    const uniqueTypeParameters = getUniqueTypeParameters(context, signature.typeParameters);
                                    const instantiatedSignature = getSignatureInstantiationWithoutFillingInTypeArguments(signature, uniqueTypeParameters);
                                    const inferences = map(context.inferences, (info) => createInferenceInfo(info.typeParameter));
                                    applyToParameterTypes(instantiatedSignature, contextualSignature, (source, target) => {
                                        inferTypes(inferences, source, target, 
                                        /*priority*/
                                        0, 
                                        /*contravariant*/
                                        true);
                                    });
                                    if (some(inferences, hasInferenceCandidates)) {
                                        applyToReturnTypes(instantiatedSignature, contextualSignature, (source, target) => {
                                            inferTypes(inferences, source, target);
                                        });
                                        if (!hasOverlappingInferences(context.inferences, inferences)) {
                                            mergeInferences(context.inferences, inferences);
                                            context.inferredTypeParameters = concatenate(context.inferredTypeParameters, uniqueTypeParameters);
                                            return getOrCreateTypeFromSignature(instantiatedSignature);
                                        }
                                    }
                                }
                                return getOrCreateTypeFromSignature(instantiateSignatureInContextOf(signature, contextualSignature, context));
                            }
                        }
                    }
                }
                return type;
            }