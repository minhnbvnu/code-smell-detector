function bindOptionalChainFlow(node) {
                if (isTopLevelLogicalExpression(node)) {
                    const postExpressionLabel = createBranchLabel();
                    bindOptionalChain(node, postExpressionLabel, postExpressionLabel);
                    currentFlow = finishFlowLabel(postExpressionLabel);
                }
                else {
                    bindOptionalChain(node, currentTrueTarget, currentFalseTarget);
                }
            }