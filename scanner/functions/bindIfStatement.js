function bindIfStatement(node) {
                const thenLabel = createBranchLabel();
                const elseLabel = createBranchLabel();
                const postIfLabel = createBranchLabel();
                bindCondition(node.expression, thenLabel, elseLabel);
                currentFlow = finishFlowLabel(thenLabel);
                bind(node.thenStatement);
                addAntecedent(postIfLabel, currentFlow);
                currentFlow = finishFlowLabel(elseLabel);
                bind(node.elseStatement);
                addAntecedent(postIfLabel, currentFlow);
                currentFlow = finishFlowLabel(postIfLabel);
            }