function isIncrement(node, name) {
                if (!node) {
                    return false;
                }
                switch (node.type) {
                    case utils_1.AST_NODE_TYPES.UpdateExpression:
                        // x++ or ++x
                        return (node.operator === '++' && isMatchingIdentifier(node.argument, name));
                    case utils_1.AST_NODE_TYPES.AssignmentExpression:
                        if (isMatchingIdentifier(node.left, name)) {
                            if (node.operator === '+=') {
                                // x += 1
                                return isLiteral(node.right, 1);
                            }
                            else if (node.operator === '=') {
                                // x = x + 1 or x = 1 + x
                                const expr = node.right;
                                return (expr.type === utils_1.AST_NODE_TYPES.BinaryExpression &&
                                    expr.operator === '+' &&
                                    ((isMatchingIdentifier(expr.left, name) &&
                                        isLiteral(expr.right, 1)) ||
                                        (isLiteral(expr.left, 1) &&
                                            isMatchingIdentifier(expr.right, name))));
                            }
                        }
                }
                return false;
            }