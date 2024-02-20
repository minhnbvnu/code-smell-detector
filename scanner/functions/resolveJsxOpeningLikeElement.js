function resolveJsxOpeningLikeElement(node, candidatesOutArray, checkMode) {
                if (isJsxIntrinsicIdentifier(node.tagName)) {
                    const result = getIntrinsicAttributesTypeFromJsxOpeningLikeElement(node);
                    const fakeSignature = createSignatureForJSXIntrinsic(node, result);
                    checkTypeAssignableToAndOptionallyElaborate(checkExpressionWithContextualType(node.attributes, getEffectiveFirstArgumentForJsxSignature(fakeSignature, node), 
                    /*inferenceContext*/
                    void 0, 0 /* Normal */), result, node.tagName, node.attributes);
                    if (length(node.typeArguments)) {
                        forEach(node.typeArguments, checkSourceElement);
                        diagnostics.add(createDiagnosticForNodeArray(getSourceFileOfNode(node), node.typeArguments, Diagnostics.Expected_0_type_arguments_but_got_1, 0, length(node.typeArguments)));
                    }
                    return fakeSignature;
                }
                const exprTypes = checkExpression(node.tagName);
                const apparentType = getApparentType(exprTypes);
                if (isErrorType(apparentType)) {
                    return resolveErrorCall(node);
                }
                const signatures = getUninstantiatedJsxSignaturesOfType(exprTypes, node);
                if (isUntypedFunctionCall(exprTypes, apparentType, signatures.length, 
                /*constructSignatures*/
                0)) {
                    return resolveUntypedCall(node);
                }
                if (signatures.length === 0) {
                    error(node.tagName, Diagnostics.JSX_element_type_0_does_not_have_any_construct_or_call_signatures, getTextOfNode(node.tagName));
                    return resolveErrorCall(node);
                }
                return resolveCall(node, signatures, candidatesOutArray, checkMode, 0 /* None */);
            }