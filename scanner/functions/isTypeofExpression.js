function isTypeofExpression(node) {
                return node.type === "UnaryExpression" && node.operator === "typeof";
            }