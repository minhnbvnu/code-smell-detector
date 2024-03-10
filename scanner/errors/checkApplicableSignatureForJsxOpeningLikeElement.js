function checkApplicableSignatureForJsxOpeningLikeElement(node, signature, relation, checkMode, reportErrors2, containingMessageChain, errorOutputContainer) {
                function checkTagNameDoesNotExpectTooManyArguments() {
                    var _a2;
                    if (getJsxNamespaceContainerForImplicitImport(node)) {
                        return true;
                    }
                    const tagType = isJsxOpeningElement(node) || isJsxSelfClosingElement(node) && !isJsxIntrinsicIdentifier(node.tagName) ? checkExpression(node.tagName) : void 0;
                    if (!tagType) {
                        return true;
                    }
                    const tagCallSignatures = getSignaturesOfType(tagType, 0 /* Call */);
                    if (!length(tagCallSignatures)) {
                        return true;
                    }
                    const factory2 = getJsxFactoryEntity(node);
                    if (!factory2) {
                        return true;
                    }
                    const factorySymbol = resolveEntityName(factory2, 111551 /* Value */, 
                    /*ignoreErrors*/
                    true, 
                    /*dontResolveAlias*/
                    false, node);
                    if (!factorySymbol) {
                        return true;
                    }
                    const factoryType = getTypeOfSymbol(factorySymbol);
                    const callSignatures = getSignaturesOfType(factoryType, 0 /* Call */);
                    if (!length(callSignatures)) {
                        return true;
                    }
                    let hasFirstParamSignatures = false;
                    let maxParamCount = 0;
                    for (const sig of callSignatures) {
                        const firstparam = getTypeAtPosition(sig, 0);
                        const signaturesOfParam = getSignaturesOfType(firstparam, 0 /* Call */);
                        if (!length(signaturesOfParam))
                            continue;
                        for (const paramSig of signaturesOfParam) {
                            hasFirstParamSignatures = true;
                            if (hasEffectiveRestParameter(paramSig)) {
                                return true;
                            }
                            const paramCount = getParameterCount(paramSig);
                            if (paramCount > maxParamCount) {
                                maxParamCount = paramCount;
                            }
                        }
                    }
                    if (!hasFirstParamSignatures) {
                        return true;
                    }
                    let absoluteMinArgCount = Infinity;
                    for (const tagSig of tagCallSignatures) {
                        const tagRequiredArgCount = getMinArgumentCount(tagSig);
                        if (tagRequiredArgCount < absoluteMinArgCount) {
                            absoluteMinArgCount = tagRequiredArgCount;
                        }
                    }
                    if (absoluteMinArgCount <= maxParamCount) {
                        return true;
                    }
                    if (reportErrors2) {
                        const diag2 = createDiagnosticForNode(node.tagName, Diagnostics.Tag_0_expects_at_least_1_arguments_but_the_JSX_factory_2_provides_at_most_3, entityNameToString(node.tagName), absoluteMinArgCount, entityNameToString(factory2), maxParamCount);
                        const tagNameDeclaration = (_a2 = getSymbolAtLocation(node.tagName)) == null ? void 0 : _a2.valueDeclaration;
                        if (tagNameDeclaration) {
                            addRelatedInfo(diag2, createDiagnosticForNode(tagNameDeclaration, Diagnostics._0_is_declared_here, entityNameToString(node.tagName)));
                        }
                        if (errorOutputContainer && errorOutputContainer.skipLogging) {
                            (errorOutputContainer.errors || (errorOutputContainer.errors = [])).push(diag2);
                        }
                        if (!errorOutputContainer.skipLogging) {
                            diagnostics.add(diag2);
                        }
                    }
                    return false;
                }