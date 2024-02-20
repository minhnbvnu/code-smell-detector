function checkStrictModePostfixUnaryExpression(node) {
                if (inStrictMode) {
                    checkStrictModeEvalOrArguments(node, node.operand);
                }
            }