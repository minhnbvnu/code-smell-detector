function bindPostfixUnaryExpressionFlow(node) {
                bindEachChild(node);
                if (node.operator === 45 /* PlusPlusToken */ || node.operator === 46 /* MinusMinusToken */) {
                    bindAssignmentTargetFlow(node.operand);
                }
            }