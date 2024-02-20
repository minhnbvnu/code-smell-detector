function isFixablePromiseHandler(node, checker) {
            if (!isPromiseHandler(node) || !hasSupportedNumberOfArguments(node) || !node.arguments.every((arg) => isFixablePromiseArgument(arg, checker))) {
                return false;
            }
            let currentNode = node.expression.expression;
            while (isPromiseHandler(currentNode) || isPropertyAccessExpression(currentNode)) {
                if (isCallExpression(currentNode)) {
                    if (!hasSupportedNumberOfArguments(currentNode) || !currentNode.arguments.every((arg) => isFixablePromiseArgument(arg, checker))) {
                        return false;
                    }
                    currentNode = currentNode.expression.expression;
                }
                else {
                    currentNode = currentNode.expression;
                }
            }
            return true;
        }