function visitAssignmentPattern(node) {
                if (isArrayLiteralExpression(node)) {
                    const elements = visitNodes2(node.elements, visitArrayAssignmentElement, isExpression);
                    return factory2.updateArrayLiteralExpression(node, elements);
                }
                else {
                    const properties = visitNodes2(node.properties, visitObjectAssignmentElement, isObjectLiteralElementLike);
                    return factory2.updateObjectLiteralExpression(node, properties);
                }
            }