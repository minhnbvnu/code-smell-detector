function checkSpreadOperator(node) {
                if (hasExcessParensWithPrecedence(node.argument, PRECEDENCE_OF_ASSIGNMENT_EXPR)) {
                    report(node.argument);
                }
            }