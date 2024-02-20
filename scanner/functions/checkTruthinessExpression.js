function checkTruthinessExpression(node, checkMode) {
                return checkTruthinessOfType(checkExpression(node, checkMode), node);
            }