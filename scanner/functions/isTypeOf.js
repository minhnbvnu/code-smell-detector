function isTypeOf(node) {
                return node.type === "UnaryExpression" && node.operator === "typeof";
            }