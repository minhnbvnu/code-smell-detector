function bindPrefixUnaryExpressionFlow(node) {
                if (node.operator === 53 /* ExclamationToken */) {
                    const saveTrueTarget = currentTrueTarget;
                    currentTrueTarget = currentFalseTarget;
                    currentFalseTarget = saveTrueTarget;
                    bindEachChild(node);
                    currentFalseTarget = currentTrueTarget;
                    currentTrueTarget = saveTrueTarget;
                }
                else {
                    bindEachChild(node);
                    if (node.operator === 45 /* PlusPlusToken */ || node.operator === 46 /* MinusMinusToken */) {
                        bindAssignmentTargetFlow(node.operand);
                    }
                }
            }