function isPossibleConstructor(node) {
        if (!node) {
            return false;
        }
        switch (node.type) {
            case "ClassExpression":
            case "FunctionExpression":
            case "ThisExpression":
            case "MemberExpression":
            case "CallExpression":
            case "NewExpression":
            case "ChainExpression":
            case "YieldExpression":
            case "TaggedTemplateExpression":
            case "MetaProperty":
                return true;
            case "Identifier":
                return node.name !== "undefined";
            case "AssignmentExpression":
                if (["=", "&&="].includes(node.operator)) {
                    return isPossibleConstructor(node.right);
                }
                if (["||=", "??="].includes(node.operator)) {
                    return (isPossibleConstructor(node.left) ||
                        isPossibleConstructor(node.right));
                }
                /**
                 * All other assignment operators are mathematical assignment operators (arithmetic or bitwise).
                 * An assignment expression with a mathematical operator can either evaluate to a primitive value,
                 * or throw, depending on the operands. Thus, it cannot evaluate to a constructor function.
                 */
                return false;
            case "LogicalExpression":
                /*
                 * If the && operator short-circuits, the left side was falsy and therefore not a constructor, and if
                 * it doesn't short-circuit, it takes the value from the right side, so the right side must always be a
                 * possible constructor. A future improvement could verify that the left side could be truthy by
                 * excluding falsy literals.
                 */
                if (node.operator === "&&") {
                    return isPossibleConstructor(node.right);
                }
                return (isPossibleConstructor(node.left) ||
                    isPossibleConstructor(node.right));
            case "ConditionalExpression":
                return (isPossibleConstructor(node.alternate) ||
                    isPossibleConstructor(node.consequent));
            case "SequenceExpression": {
                const lastExpression = node.expressions[node.expressions.length - 1];
                return isPossibleConstructor(lastExpression);
            }
            default:
                return false;
        }
    }