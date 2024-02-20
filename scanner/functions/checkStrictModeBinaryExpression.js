function checkStrictModeBinaryExpression(node) {
                if (inStrictMode && isLeftHandSideExpression(node.left) && isAssignmentOperator(node.operatorToken.kind)) {
                    checkStrictModeEvalOrArguments(node, node.left);
                }
            }