function resolveCall(node, signatures, candidatesOutArray, checkMode, callChainFlags, headMessage) {
                const isTaggedTemplate = node.kind === 212 /* TaggedTemplateExpression */;
                const isDecorator2 = node.kind === 167 /* Decorator */;
                const isJsxOpeningOrSelfClosingElement = isJsxOpeningLikeElement(node);
                const reportErrors2 = !isInferencePartiallyBlocked && !candidatesOutArray;
                let typeArguments;
                if (!isDecorator2 && !isSuperCall(node)) {
                    typeArguments = node.typeArguments;
                    if (isTaggedTemplate || isJsxOpeningOrSelfClosingElement || node.expression.kind !== 106 /* SuperKeyword */) {
                        forEach(typeArguments, checkSourceElement);
                    }
                }
                const candidates = candidatesOutArray || [];
                reorderCandidates(signatures, candidates, callChainFlags);
                if (!candidates.length) {
                    if (reportErrors2) {
                        diagnostics.add(getDiagnosticForCallNode(node, Diagnostics.Call_target_does_not_contain_any_signatures));
                    }
                    return resolveErrorCall(node);
                }
                const args = getEffectiveCallArguments(node);
                const isSingleNonGenericCandidate = candidates.length === 1 && !candidates[0].typeParameters;
                let argCheckMode = !isDecorator2 && !isSingleNonGenericCandidate && some(args, isContextSensitive) ? 4 /* SkipContextSensitive */ : 0 /* Normal */;
                argCheckMode |= checkMode & 32 /* IsForStringLiteralArgumentCompletions */;
                let candidatesForArgumentError;
                let candidateForArgumentArityError;
                let candidateForTypeArgumentError;
                let result;
                const signatureHelpTrailingComma = !!(checkMode & 16 /* IsForSignatureHelp */) && node.kind === 210 /* CallExpression */ && node.arguments.hasTrailingComma;
                if (candidates.length > 1) {
                    result = chooseOverload(candidates, subtypeRelation, isSingleNonGenericCandidate, signatureHelpTrailingComma);
                }
                if (!result) {
                    result = chooseOverload(candidates, assignableRelation, isSingleNonGenericCandidate, signatureHelpTrailingComma);
                }
                if (result) {
                    return result;
                }
                result = getCandidateForOverloadFailure(node, candidates, args, !!candidatesOutArray, checkMode);
                getNodeLinks(node).resolvedSignature = result;
                if (reportErrors2) {
                    if (candidatesForArgumentError) {
                        if (candidatesForArgumentError.length === 1 || candidatesForArgumentError.length > 3) {
                            const last2 = candidatesForArgumentError[candidatesForArgumentError.length - 1];
                            let chain;
                            if (candidatesForArgumentError.length > 3) {
                                chain = chainDiagnosticMessages(chain, Diagnostics.The_last_overload_gave_the_following_error);
                                chain = chainDiagnosticMessages(chain, Diagnostics.No_overload_matches_this_call);
                            }
                            if (headMessage) {
                                chain = chainDiagnosticMessages(chain, headMessage);
                            }
                            const diags = getSignatureApplicabilityError(node, args, last2, assignableRelation, 0 /* Normal */, 
                            /*reportErrors*/
                            true, () => chain);
                            if (diags) {
                                for (const d of diags) {
                                    if (last2.declaration && candidatesForArgumentError.length > 3) {
                                        addRelatedInfo(d, createDiagnosticForNode(last2.declaration, Diagnostics.The_last_overload_is_declared_here));
                                    }
                                    addImplementationSuccessElaboration(last2, d);
                                    diagnostics.add(d);
                                }
                            }
                            else {
                                Debug.fail("No error for last overload signature");
                            }
                        }
                        else {
                            const allDiagnostics = [];
                            let max = 0;
                            let min2 = Number.MAX_VALUE;
                            let minIndex = 0;
                            let i = 0;
                            for (const c of candidatesForArgumentError) {
                                const chain2 = () => chainDiagnosticMessages(
                                /*details*/
                                void 0, Diagnostics.Overload_0_of_1_2_gave_the_following_error, i + 1, candidates.length, signatureToString(c));
                                const diags2 = getSignatureApplicabilityError(node, args, c, assignableRelation, 0 /* Normal */, 
                                /*reportErrors*/
                                true, chain2);
                                if (diags2) {
                                    if (diags2.length <= min2) {
                                        min2 = diags2.length;
                                        minIndex = i;
                                    }
                                    max = Math.max(max, diags2.length);
                                    allDiagnostics.push(diags2);
                                }
                                else {
                                    Debug.fail("No error for 3 or fewer overload signatures");
                                }
                                i++;
                            }
                            const diags = max > 1 ? allDiagnostics[minIndex] : flatten(allDiagnostics);
                            Debug.assert(diags.length > 0, "No errors reported for 3 or fewer overload signatures");
                            let chain = chainDiagnosticMessages(map(diags, createDiagnosticMessageChainFromDiagnostic), Diagnostics.No_overload_matches_this_call);
                            if (headMessage) {
                                chain = chainDiagnosticMessages(chain, headMessage);
                            }
                            const related = [...flatMap(diags, (d) => d.relatedInformation)];
                            let diag2;
                            if (every(diags, (d) => d.start === diags[0].start && d.length === diags[0].length && d.file === diags[0].file)) {
                                const { file, start, length: length2 } = diags[0];
                                diag2 = { file, start, length: length2, code: chain.code, category: chain.category, messageText: chain, relatedInformation: related };
                            }
                            else {
                                diag2 = createDiagnosticForNodeFromMessageChain(getSourceFileOfNode(node), node, chain, related);
                            }
                            addImplementationSuccessElaboration(candidatesForArgumentError[0], diag2);
                            diagnostics.add(diag2);
                        }
                    }
                    else if (candidateForArgumentArityError) {
                        diagnostics.add(getArgumentArityError(node, [candidateForArgumentArityError], args, headMessage));
                    }
                    else if (candidateForTypeArgumentError) {
                        checkTypeArguments(candidateForTypeArgumentError, node.typeArguments, 
                        /*reportErrors*/
                        true, headMessage);
                    }
                    else {
                        const signaturesWithCorrectTypeArgumentArity = filter(signatures, (s) => hasCorrectTypeArgumentArity(s, typeArguments));
                        if (signaturesWithCorrectTypeArgumentArity.length === 0) {
                            diagnostics.add(getTypeArgumentArityError(node, signatures, typeArguments, headMessage));
                        }
                        else {
                            diagnostics.add(getArgumentArityError(node, signaturesWithCorrectTypeArgumentArity, args, headMessage));
                        }
                    }
                }
                return result;
                function addImplementationSuccessElaboration(failed, diagnostic) {
                    var _a2, _b;
                    const oldCandidatesForArgumentError = candidatesForArgumentError;
                    const oldCandidateForArgumentArityError = candidateForArgumentArityError;
                    const oldCandidateForTypeArgumentError = candidateForTypeArgumentError;
                    const failedSignatureDeclarations = ((_b = (_a2 = failed.declaration) == null ? void 0 : _a2.symbol) == null ? void 0 : _b.declarations) || emptyArray;
                    const isOverload = failedSignatureDeclarations.length > 1;
                    const implDecl = isOverload ? find(failedSignatureDeclarations, (d) => isFunctionLikeDeclaration(d) && nodeIsPresent(d.body)) : void 0;
                    if (implDecl) {
                        const candidate = getSignatureFromDeclaration(implDecl);
                        const isSingleNonGenericCandidate2 = !candidate.typeParameters;
                        if (chooseOverload([candidate], assignableRelation, isSingleNonGenericCandidate2)) {
                            addRelatedInfo(diagnostic, createDiagnosticForNode(implDecl, Diagnostics.The_call_would_have_succeeded_against_this_implementation_but_implementation_signatures_of_overloads_are_not_externally_visible));
                        }
                    }
                    candidatesForArgumentError = oldCandidatesForArgumentError;
                    candidateForArgumentArityError = oldCandidateForArgumentArityError;
                    candidateForTypeArgumentError = oldCandidateForTypeArgumentError;
                }
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
            }