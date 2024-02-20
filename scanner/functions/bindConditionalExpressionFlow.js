function bindConditionalExpressionFlow(node) {
                const trueLabel = createBranchLabel();
                const falseLabel = createBranchLabel();
                const postExpressionLabel = createBranchLabel();
                bindCondition(node.condition, trueLabel, falseLabel);
                currentFlow = finishFlowLabel(trueLabel);
                bind(node.questionToken);
                bind(node.whenTrue);
                addAntecedent(postExpressionLabel, currentFlow);
                currentFlow = finishFlowLabel(falseLabel);
                bind(node.colonToken);
                bind(node.whenFalse);
                addAntecedent(postExpressionLabel, currentFlow);
                currentFlow = finishFlowLabel(postExpressionLabel);
            }