function visitExponentiationExpression(node) {
                const left = visitNode(node.left, visitor, isExpression);
                const right = visitNode(node.right, visitor, isExpression);
                return setTextRange(factory2.createGlobalMethodCall("Math", "pow", [left, right]), node);
            }