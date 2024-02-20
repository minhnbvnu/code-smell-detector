function bindForInOrForOfStatement(node) {
                const preLoopLabel = setContinueTarget(node, createLoopLabel());
                const postLoopLabel = createBranchLabel();
                bind(node.expression);
                addAntecedent(preLoopLabel, currentFlow);
                currentFlow = preLoopLabel;
                if (node.kind === 247 /* ForOfStatement */) {
                    bind(node.awaitModifier);
                }
                addAntecedent(postLoopLabel, currentFlow);
                bind(node.initializer);
                if (node.initializer.kind !== 258 /* VariableDeclarationList */) {
                    bindAssignmentTargetFlow(node.initializer);
                }
                bindIterativeStatement(node.statement, postLoopLabel, preLoopLabel);
                addAntecedent(preLoopLabel, currentFlow);
                currentFlow = finishFlowLabel(postLoopLabel);
            }