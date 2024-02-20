function chooseOverload(candidates2, relation, isSingleNonGenericCandidate2, signatureHelpTrailingComma2 = false) {
                    candidatesForArgumentError = void 0;
                    candidateForArgumentArityError = void 0;
                    candidateForTypeArgumentError = void 0;
                    if (isSingleNonGenericCandidate2) {
                        const candidate = candidates2[0];
                        if (some(typeArguments) || !hasCorrectArity(node, args, candidate, signatureHelpTrailingComma2)) {
                            return void 0;
                        }
                        if (getSignatureApplicabilityError(node, args, candidate, relation, 0 /* Normal */, 
                        /*reportErrors*/
                        false, 
                        /*containingMessageChain*/
                        void 0)) {
                            candidatesForArgumentError = [candidate];
                            return void 0;
                        }
                        return candidate;
                    }
                    for (let candidateIndex = 0; candidateIndex < candidates2.length; candidateIndex++) {
                        const candidate = candidates2[candidateIndex];
                        if (!hasCorrectTypeArgumentArity(candidate, typeArguments) || !hasCorrectArity(node, args, candidate, signatureHelpTrailingComma2)) {
                            continue;
                        }
                        let checkCandidate;
                        let inferenceContext;
                        if (candidate.typeParameters) {
                            let typeArgumentTypes;
                            if (some(typeArguments)) {
                                typeArgumentTypes = checkTypeArguments(candidate, typeArguments, 
                                /*reportErrors*/
                                false);
                                if (!typeArgumentTypes) {
                                    candidateForTypeArgumentError = candidate;
                                    continue;
                                }
                            }
                            else {
                                inferenceContext = createInferenceContext(candidate.typeParameters, candidate, 
                                /*flags*/
                                isInJSFile(node) ? 2 /* AnyDefault */ : 0 /* None */);
                                typeArgumentTypes = inferTypeArguments(node, candidate, args, argCheckMode | 8 /* SkipGenericFunctions */, inferenceContext);
                                argCheckMode |= inferenceContext.flags & 4 /* SkippedGenericFunction */ ? 8 /* SkipGenericFunctions */ : 0 /* Normal */;
                            }
                            checkCandidate = getSignatureInstantiation(candidate, typeArgumentTypes, isInJSFile(candidate.declaration), inferenceContext && inferenceContext.inferredTypeParameters);
                            if (getNonArrayRestType(candidate) && !hasCorrectArity(node, args, checkCandidate, signatureHelpTrailingComma2)) {
                                candidateForArgumentArityError = checkCandidate;
                                continue;
                            }
                        }
                        else {
                            checkCandidate = candidate;
                        }
                        if (getSignatureApplicabilityError(node, args, checkCandidate, relation, argCheckMode, 
                        /*reportErrors*/
                        false, 
                        /*containingMessageChain*/
                        void 0)) {
                            (candidatesForArgumentError || (candidatesForArgumentError = [])).push(checkCandidate);
                            continue;
                        }
                        if (argCheckMode) {
                            argCheckMode = checkMode & 32 /* IsForStringLiteralArgumentCompletions */;
                            if (inferenceContext) {
                                const typeArgumentTypes = inferTypeArguments(node, candidate, args, argCheckMode, inferenceContext);
                                checkCandidate = getSignatureInstantiation(candidate, typeArgumentTypes, isInJSFile(candidate.declaration), inferenceContext.inferredTypeParameters);
                                if (getNonArrayRestType(candidate) && !hasCorrectArity(node, args, checkCandidate, signatureHelpTrailingComma2)) {
                                    candidateForArgumentArityError = checkCandidate;
                                    continue;
                                }
                            }
                            if (getSignatureApplicabilityError(node, args, checkCandidate, relation, argCheckMode, 
                            /*reportErrors*/
                            false, 
                            /*containingMessageChain*/
                            void 0)) {
                                (candidatesForArgumentError || (candidatesForArgumentError = [])).push(checkCandidate);
                                continue;
                            }
                        }
                        candidates2[candidateIndex] = checkCandidate;
                        return checkCandidate;
                    }
                    return void 0;
                }