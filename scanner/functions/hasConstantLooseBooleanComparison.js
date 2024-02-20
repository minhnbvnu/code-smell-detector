function hasConstantLooseBooleanComparison(scope, node) {
        switch (node.type) {
            case "ObjectExpression":
            case "ClassExpression":
                /**
                 * In theory objects like:
                 *
                 * `{toString: () => a}`
                 * `{valueOf: () => a}`
                 *
                 * Or a classes like:
                 *
                 * `class { static toString() { return a } }`
                 * `class { static valueOf() { return a } }`
                 *
                 * Are not constant verifiably when `inBooleanPosition` is
                 * false, but it's an edge case we've opted not to handle.
                 */
                return true;
            case "ArrayExpression": {
                const nonSpreadElements = node.elements.filter(e => 
                // Elements can be `null` in sparse arrays: `[,,]`;
                e !== null && e.type !== "SpreadElement");
                /*
                 * Possible future direction if needed: We could check if the
                 * single value would result in variable boolean comparison.
                 * For now we will err on the side of caution since `[x]` could
                 * evaluate to `[0]` or `[1]`.
                 */
                return node.elements.length === 0 || nonSpreadElements.length > 1;
            }
            case "ArrowFunctionExpression":
            case "FunctionExpression":
                return true;
            case "UnaryExpression":
                if (node.operator === "void" || // Always returns `undefined`
                    node.operator === "typeof" // All `typeof` strings, when coerced to number, are not 0 or 1.
                ) {
                    return true;
                }
                if (node.operator === "!") {
                    return isConstant(scope, node.argument, true);
                }
                /*
                 * We won't try to reason about +, -, ~, or delete
                 * In theory, for the mathematical operators, we could look at the
                 * argument and try to determine if it coerces to a constant numeric
                 * value.
                 */
                return false;
            case "NewExpression": // Objects might have custom `.valueOf` or `.toString`.
                return false;
            case "CallExpression": {
                if (node.callee.type === "Identifier" &&
                    node.callee.name === "Boolean" &&
                    isReferenceToGlobalVariable(scope, node.callee)) {
                    return node.arguments.length === 0 || isConstant(scope, node.arguments[0], true);
                }
                return false;
            }
            case "Literal": // True or false, literals never change
                return true;
            case "Identifier":
                return node.name === "undefined" && isReferenceToGlobalVariable(scope, node);
            case "TemplateLiteral":
                /*
                 * In theory we could try to check if the quasi are sufficient to
                 * prove that the expression will always be true, but it would be
                 * tricky to get right. For example: `000.${foo}000`
                 */
                return node.expressions.length === 0;
            case "AssignmentExpression":
                if (node.operator === "=") {
                    return hasConstantLooseBooleanComparison(scope, node.right);
                }
                /*
                 * Handling short-circuiting assignment operators would require
                 * walking the scope. We won't attempt that (for now...)
                 *
                 * The remaining assignment expressions all result in a numeric or
                 * string (non-nullish) values which could be truthy or falsy:
                 *   "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=", "|=", "^=", "&="
                 */
                return false;
            case "SequenceExpression": {
                const last = node.expressions[node.expressions.length - 1];
                return hasConstantLooseBooleanComparison(scope, last);
            }
            case "JSXElement": // ESLint has a policy of not assuming any specific JSX behavior.
            case "JSXFragment":
                return false;
            default:
                return false;
        }
    }