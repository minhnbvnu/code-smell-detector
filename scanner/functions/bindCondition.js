function bindCondition(node, trueTarget, falseTarget) {
                doWithConditionalBranches(bind, node, trueTarget, falseTarget);
                if (!node || !isLogicalAssignmentExpression(node) && !isLogicalExpression(node) && !(isOptionalChain(node) && isOutermostOptionalChain(node))) {
                    addAntecedent(trueTarget, createFlowCondition(32 /* TrueCondition */, currentFlow, node));
                    addAntecedent(falseTarget, createFlowCondition(64 /* FalseCondition */, currentFlow, node));
                }
            }