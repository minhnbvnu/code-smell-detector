function visitAssignmentRestProperty(node) {
                if (isLeftHandSideExpression(node.expression)) {
                    const expression = visitDestructuringAssignmentTarget(node.expression);
                    return factory2.updateSpreadAssignment(node, expression);
                }
                return visitEachChild(node, visitor, context);
            }