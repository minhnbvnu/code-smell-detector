function hasConstantStrictBooleanComparison(scope, node) {
        switch (node.type) {
            case "ObjectExpression": // Objects are not booleans
            case "ArrayExpression": // Arrays are not booleans
            case "ArrowFunctionExpression": // Functions are not booleans
            case "FunctionExpression":
            case "ClassExpression": // Classes are not booleans
            case "NewExpression": // Objects are not booleans
            case "TemplateLiteral": // Strings are not booleans
            case "Literal": // True, false, or not boolean, literals never change.
            case "UpdateExpression": // Numbers are not booleans
                return true;
            case "BinaryExpression":
                return NUMERIC_OR_STRING_BINARY_OPERATORS.has(node.operator);
            case "UnaryExpression": {
                if (node.operator === "delete") {
                    return false;
                }
                if (node.operator === "!") {
                    return isConstant(scope, node.argument, true);
                }
                /*
                 * The remaining operators return either strings or numbers, neither
                 * of which are boolean.
                 */
                return true;
            }
            case "SequenceExpression": {
                const last = node.expressions[node.expressions.length - 1];
                return hasConstantStrictBooleanComparison(scope, last);
            }
            case "Identifier":
                return node.name === "undefined" && isReferenceToGlobalVariable(scope, node);
            case "AssignmentExpression":
                if (node.operator === "=") {
                    return hasConstantStrictBooleanComparison(scope, node.right);
                }
                /*
                 * Handling short-circuiting assignment operators would require
                 * walking the scope. We won't attempt that (for now...)
                 */
                if (isLogicalAssignmentOperator(node.operator)) {
                    return false;
                }
                /*
                 * The remaining assignment expressions all result in either a number
                 * or a string, neither of which can ever be boolean.
                 */
                return true;
            case "CallExpression": {
                if (node.callee.type !== "Identifier") {
                    return false;
                }
                const functionName = node.callee.name;
                if ((functionName === "String" || functionName === "Number") &&
                    isReferenceToGlobalVariable(scope, node.callee)) {
                    return true;
                }
                if (functionName === "Boolean" && isReferenceToGlobalVariable(scope, node.callee)) {
                    return (node.arguments.length === 0 || isConstant(scope, node.arguments[0], true));
                }
                return false;
            }
            case "JSXElement": // ESLint has a policy of not assuming any specific JSX behavior.
            case "JSXFragment":
                return false;
            default:
                return false;
        }
    }