function convertToAssignmentElementTarget(node) {
                if (isBindingPattern(node)) {
                    return convertToAssignmentPattern(node);
                }
                return cast(node, isExpression);
            }