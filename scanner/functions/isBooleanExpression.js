function isBooleanExpression(node) {
                return node.type === "BinaryExpression" && BOOLEAN_OPERATORS.has(node.operator) ||
                    node.type === "UnaryExpression" && node.operator === "!";
            }