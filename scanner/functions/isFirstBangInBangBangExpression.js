function isFirstBangInBangBangExpression(node) {
                return node && node.type === "UnaryExpression" && node.argument.operator === "!" &&
                    node.argument && node.argument.type === "UnaryExpression" && node.argument.operator === "!";
            }