function bindForStatement(node) {
                const preLoopLabel = setContinueTarget(node, createLoopLabel());
                const preBodyLabel = createBranchLabel();
                const postLoopLabel = createBranchLabel();
                bind(node.initializer);
                addAntecedent(preLoopLabel, currentFlow);
                currentFlow = preLoopLabel;
                bindCondition(node.condition, preBodyLabel, postLoopLabel);
                currentFlow = finishFlowLabel(preBodyLabel);
                bindIterativeStatement(node.statement, postLoopLabel, preLoopLabel);
                bind(node.incrementor);
                addAntecedent(preLoopLabel, currentFlow);
                currentFlow = finishFlowLabel(postLoopLabel);
            }