function visitInvalidSuperProperty(node) {
                return isPropertyAccessExpression(node) ? factory2.updatePropertyAccessExpression(node, factory2.createVoidZero(), node.name) : factory2.updateElementAccessExpression(node, factory2.createVoidZero(), visitNode(node.argumentExpression, visitor, isExpression));
            }