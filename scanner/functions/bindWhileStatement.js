function bindWhileStatement(node) {
                const preWhileLabel = setContinueTarget(node, createLoopLabel());
                const preBodyLabel = createBranchLabel();
                const postWhileLabel = createBranchLabel();
                addAntecedent(preWhileLabel, currentFlow);
                currentFlow = preWhileLabel;
                bindCondition(node.expression, preBodyLabel, postWhileLabel);
                currentFlow = finishFlowLabel(preBodyLabel);
                bindIterativeStatement(node.statement, postWhileLabel, preWhileLabel);
                addAntecedent(preWhileLabel, currentFlow);
                currentFlow = finishFlowLabel(postWhileLabel);
            }