function resolveTaggedTemplateExpression(node, candidatesOutArray, checkMode) {
                const tagType = checkExpression(node.tag);
                const apparentType = getApparentType(tagType);
                if (isErrorType(apparentType)) {
                    return resolveErrorCall(node);
                }
                const callSignatures = getSignaturesOfType(apparentType, 0 /* Call */);
                const numConstructSignatures = getSignaturesOfType(apparentType, 1 /* Construct */).length;
                if (isUntypedFunctionCall(tagType, apparentType, callSignatures.length, numConstructSignatures)) {
                    return resolveUntypedCall(node);
                }
                if (!callSignatures.length) {
                    if (isArrayLiteralExpression(node.parent)) {
                        const diagnostic = createDiagnosticForNode(node.tag, Diagnostics.It_is_likely_that_you_are_missing_a_comma_to_separate_these_two_template_expressions_They_form_a_tagged_template_expression_which_cannot_be_invoked);
                        diagnostics.add(diagnostic);
                        return resolveErrorCall(node);
                    }
                    invocationError(node.tag, apparentType, 0 /* Call */);
                    return resolveErrorCall(node);
                }
                return resolveCall(node, callSignatures, candidatesOutArray, checkMode, 0 /* None */);
            }