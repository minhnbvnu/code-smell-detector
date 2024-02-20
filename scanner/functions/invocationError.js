function invocationError(errorTarget, apparentType, kind, relatedInformation) {
                const { messageChain, relatedMessage: relatedInfo } = invocationErrorDetails(errorTarget, apparentType, kind);
                const diagnostic = createDiagnosticForNodeFromMessageChain(getSourceFileOfNode(errorTarget), errorTarget, messageChain);
                if (relatedInfo) {
                    addRelatedInfo(diagnostic, createDiagnosticForNode(errorTarget, relatedInfo));
                }
                if (isCallExpression(errorTarget.parent)) {
                    const { start, length: length2 } = getDiagnosticSpanForCallNode(errorTarget.parent, 
                    /* doNotIncludeArguments */
                    true);
                    diagnostic.start = start;
                    diagnostic.length = length2;
                }
                diagnostics.add(diagnostic);
                invocationErrorRecovery(apparentType, kind, relatedInformation ? addRelatedInfo(diagnostic, relatedInformation) : diagnostic);
            }