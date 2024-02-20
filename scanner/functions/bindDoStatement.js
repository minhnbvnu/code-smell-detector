function bindDoStatement(node) {
                const preDoLabel = createLoopLabel();
                const preConditionLabel = setContinueTarget(node, createBranchLabel());
                const postDoLabel = createBranchLabel();
                addAntecedent(preDoLabel, currentFlow);
                currentFlow = preDoLabel;
                bindIterativeStatement(node.statement, postDoLabel, preConditionLabel);
                addAntecedent(preConditionLabel, currentFlow);
                currentFlow = finishFlowLabel(preConditionLabel);
                bindCondition(node.expression, preDoLabel, postDoLabel);
                currentFlow = finishFlowLabel(postDoLabel);
            }