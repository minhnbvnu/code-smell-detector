function isAlwaysNew(scope, node) {
        switch (node.type) {
            case "ObjectExpression":
            case "ArrayExpression":
            case "ArrowFunctionExpression":
            case "FunctionExpression":
            case "ClassExpression":
                return true;
            case "NewExpression": {
                if (node.callee.type !== "Identifier") {
                    return false;
                }
                /*
                 * All the built-in constructors are always new, but
                 * user-defined constructors could return a sentinel
                 * object.
                 *
                 * Catching these is especially useful for primitive constructors
                 * which return boxed values, a surprising gotcha' in JavaScript.
                 */
                return Object.hasOwnProperty.call(globals.builtin, node.callee.name) &&
                    isReferenceToGlobalVariable(scope, node.callee);
            }
            case "Literal":
                // Regular expressions are objects, and thus always new
                return typeof node.regex === "object";
            case "SequenceExpression": {
                const last = node.expressions[node.expressions.length - 1];
                return isAlwaysNew(scope, last);
            }
            case "AssignmentExpression":
                if (node.operator === "=") {
                    return isAlwaysNew(scope, node.right);
                }
                return false;
            case "ConditionalExpression":
                return isAlwaysNew(scope, node.consequent) && isAlwaysNew(scope, node.alternate);
            case "JSXElement": // ESLint has a policy of not assuming any specific JSX behavior.
            case "JSXFragment":
                return false;
            default:
                return false;
        }
    }