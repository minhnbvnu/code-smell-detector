function isLogicalContext(node) {
                return node.type === "LogicalExpression" &&
                    (node.operator === "||" || node.operator === "&&") &&
                    (context.options.length && context.options[0].enforceForLogicalOperands === true);
            }