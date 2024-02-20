function convertToArrayAssignmentPattern(node) {
                if (isArrayBindingPattern(node)) {
                    return setOriginalNode(setTextRange(factory2.createArrayLiteralExpression(map(node.elements, convertToArrayAssignmentElement)), node), node);
                }
                return cast(node, isArrayLiteralExpression);
            }