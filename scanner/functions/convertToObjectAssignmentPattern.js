function convertToObjectAssignmentPattern(node) {
                if (isObjectBindingPattern(node)) {
                    return setOriginalNode(setTextRange(factory2.createObjectLiteralExpression(map(node.elements, convertToObjectAssignmentElement)), node), node);
                }
                return cast(node, isObjectLiteralExpression);
            }