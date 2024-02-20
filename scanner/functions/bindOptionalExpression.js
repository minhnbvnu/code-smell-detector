function bindOptionalExpression(node, trueTarget, falseTarget) {
                doWithConditionalBranches(bind, node, trueTarget, falseTarget);
                if (!isOptionalChain(node) || isOutermostOptionalChain(node)) {
                    addAntecedent(trueTarget, createFlowCondition(32 /* TrueCondition */, currentFlow, node));
                    addAntecedent(falseTarget, createFlowCondition(64 /* FalseCondition */, currentFlow, node));
                }
            }