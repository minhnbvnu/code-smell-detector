function isNegZero(node) {
                return node.type === "UnaryExpression" && node.operator === "-" && node.argument.type === "Literal" && node.argument.value === 0;
            }