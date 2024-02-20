function bindOptionalChain(node, trueTarget, falseTarget) {
                const preChainLabel = isOptionalChainRoot(node) ? createBranchLabel() : void 0;
                bindOptionalExpression(node.expression, preChainLabel || trueTarget, falseTarget);
                if (preChainLabel) {
                    currentFlow = finishFlowLabel(preChainLabel);
                }
                doWithConditionalBranches(bindOptionalChainRest, node, trueTarget, falseTarget);
                if (isOutermostOptionalChain(node)) {
                    addAntecedent(trueTarget, createFlowCondition(32 /* TrueCondition */, currentFlow, node));
                    addAntecedent(falseTarget, createFlowCondition(64 /* FalseCondition */, currentFlow, node));
                }
            }