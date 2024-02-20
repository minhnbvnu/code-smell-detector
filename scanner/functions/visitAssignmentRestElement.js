function visitAssignmentRestElement(node) {
                if (isLeftHandSideExpression(node.expression)) {
                    const expression = visitDestructuringAssignmentTarget(node.expression);
                    return factory2.updateSpreadElement(node, expression);
                }
                return visitEachChild(node, visitor, context);
            }