function hasConstantNullishness(scope, node, nonNullish) {
        if (nonNullish && isNullOrUndefined(scope, node)) {
            return false;
        }
        switch (node.type) {
            case "ObjectExpression": // Objects are never nullish
            case "ArrayExpression": // Arrays are never nullish
            case "ArrowFunctionExpression": // Functions never nullish
            case "FunctionExpression": // Functions are never nullish
            case "ClassExpression": // Classes are never nullish
            case "NewExpression": // Objects are never nullish
            case "Literal": // Nullish, or non-nullish, literals never change
            case "TemplateLiteral": // A string is never nullish
            case "UpdateExpression": // Numbers are never nullish
            case "BinaryExpression": // Numbers, strings, or booleans are never nullish
                return true;
            case "CallExpression": {
                if (node.callee.type !== "Identifier") {
                    return false;
                }
                const functionName = node.callee.name;
                return (functionName === "Boolean" || functionName === "String" || functionName === "Number") &&
                    isReferenceToGlobalVariable(scope, node.callee);
            }
            case "LogicalExpression": {
                return node.operator === "??" && hasConstantNullishness(scope, node.right, true);
            }
            case "AssignmentExpression":
                if (node.operator === "=") {
                    return hasConstantNullishness(scope, node.right, nonNullish);
                }
                /*
                 * Handling short-circuiting assignment operators would require
                 * walking the scope. We won't attempt that (for now...) /
                 */
                if (isLogicalAssignmentOperator(node.operator)) {
                    return false;
                }
                /*
                 * The remaining assignment expressions all result in a numeric or
                 * string (non-nullish) value:
                 *   "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=", "|=", "^=", "&="
                 */
                return true;
            case "UnaryExpression":
                /*
                 * "void" Always returns `undefined`
                 * "typeof" All types are strings, and thus non-nullish
                 * "!" Boolean is never nullish
                 * "delete" Returns a boolean, which is never nullish
                 * Math operators always return numbers or strings, neither of which
                 * are non-nullish "+", "-", "~"
                 */
                return true;
            case "SequenceExpression": {
                const last = node.expressions[node.expressions.length - 1];
                return hasConstantNullishness(scope, last, nonNullish);
            }
            case "Identifier":
                return node.name === "undefined" && isReferenceToGlobalVariable(scope, node);
            case "JSXElement": // ESLint has a policy of not assuming any specific JSX behavior.
            case "JSXFragment":
                return false;
            default:
                return false;
        }
    }