function checkArgumentWithPrecedence(node) {
                if (hasExcessParensWithPrecedence(node.argument, precedence(node))) {
                    report(node.argument);
                }
            }