function checkStrictModePrefixUnaryExpression(node) {
                if (inStrictMode) {
                    if (node.operator === 45 /* PlusPlusToken */ || node.operator === 46 /* MinusMinusToken */) {
                        checkStrictModeEvalOrArguments(node, node.operand);
                    }
                }
            }