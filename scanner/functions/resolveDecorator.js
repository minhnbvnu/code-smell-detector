function resolveDecorator(node, candidatesOutArray, checkMode) {
                const funcType = checkExpression(node.expression);
                const apparentType = getApparentType(funcType);
                if (isErrorType(apparentType)) {
                    return resolveErrorCall(node);
                }
                const callSignatures = getSignaturesOfType(apparentType, 0 /* Call */);
                const numConstructSignatures = getSignaturesOfType(apparentType, 1 /* Construct */).length;
                if (isUntypedFunctionCall(funcType, apparentType, callSignatures.length, numConstructSignatures)) {
                    return resolveUntypedCall(node);
                }
                if (isPotentiallyUncalledDecorator(node, callSignatures) && !isParenthesizedExpression(node.expression)) {
                    const nodeStr = getTextOfNode(node.expression, 
                    /*includeTrivia*/
                    false);
                    error(node, Diagnostics._0_accepts_too_few_arguments_to_be_used_as_a_decorator_here_Did_you_mean_to_call_it_first_and_write_0, nodeStr);
                    return resolveErrorCall(node);
                }
                const headMessage = getDiagnosticHeadMessageForDecoratorResolution(node);
                if (!callSignatures.length) {
                    const errorDetails = invocationErrorDetails(node.expression, apparentType, 0 /* Call */);
                    const messageChain = chainDiagnosticMessages(errorDetails.messageChain, headMessage);
                    const diag2 = createDiagnosticForNodeFromMessageChain(getSourceFileOfNode(node.expression), node.expression, messageChain);
                    if (errorDetails.relatedMessage) {
                        addRelatedInfo(diag2, createDiagnosticForNode(node.expression, errorDetails.relatedMessage));
                    }
                    diagnostics.add(diag2);
                    invocationErrorRecovery(apparentType, 0 /* Call */, diag2);
                    return resolveErrorCall(node);
                }
                return resolveCall(node, callSignatures, candidatesOutArray, checkMode, 0 /* None */, headMessage);
            }