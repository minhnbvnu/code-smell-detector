function bindLogicalLikeExpression(node, trueTarget, falseTarget) {
                const preRightLabel = createBranchLabel();
                if (node.operatorToken.kind === 55 /* AmpersandAmpersandToken */ || node.operatorToken.kind === 76 /* AmpersandAmpersandEqualsToken */) {
                    bindCondition(node.left, preRightLabel, falseTarget);
                }
                else {
                    bindCondition(node.left, trueTarget, preRightLabel);
                }
                currentFlow = finishFlowLabel(preRightLabel);
                bind(node.operatorToken);
                if (isLogicalOrCoalescingAssignmentOperator(node.operatorToken.kind)) {
                    doWithConditionalBranches(bind, node.right, trueTarget, falseTarget);
                    bindAssignmentTargetFlow(node.left);
                    addAntecedent(trueTarget, createFlowCondition(32 /* TrueCondition */, currentFlow, node));
                    addAntecedent(falseTarget, createFlowCondition(64 /* FalseCondition */, currentFlow, node));
                }
                else {
                    bindCondition(node.right, trueTarget, falseTarget);
                }
            }