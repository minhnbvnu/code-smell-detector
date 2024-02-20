function bindDeleteExpressionFlow(node) {
                bindEachChild(node);
                if (node.expression.kind === 208 /* PropertyAccessExpression */) {
                    bindAssignmentTargetFlow(node.expression);
                }
            }