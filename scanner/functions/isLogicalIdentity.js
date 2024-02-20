function isLogicalIdentity(node, operator) {
        switch (node.type) {
            case "Literal":
                return (operator === "||" && getBooleanValue(node) === true) ||
                    (operator === "&&" && getBooleanValue(node) === false);
            case "UnaryExpression":
                return (operator === "&&" && node.operator === "void");
            case "LogicalExpression":
                /*
                 * handles `a && false || b`
                 * `false` is an identity element of `&&` but not `||`
                 */
                return operator === node.operator &&
                    (isLogicalIdentity(node.left, operator) ||
                        isLogicalIdentity(node.right, operator));
            case "AssignmentExpression":
                return ["||=", "&&="].includes(node.operator) &&
                    operator === node.operator.slice(0, -1) &&
                    isLogicalIdentity(node.right, operator);
            // no default
        }
        return false;
    }