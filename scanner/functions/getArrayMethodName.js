function getArrayMethodName(node) {
        let currentNode = node;
        while (currentNode) {
            const parent = currentNode.parent;
            switch (parent.type) {
                /*
                 * Looks up the destination. e.g.,
                 * foo.every(nativeFoo || function foo() { ... });
                 */
                case "LogicalExpression":
                case "ConditionalExpression":
                case "ChainExpression":
                    currentNode = parent;
                    break;
                /*
                 * If the upper function is IIFE, checks the destination of the return value.
                 * e.g.
                 *   foo.every((function() {
                 *     // setup...
                 *     return function callback() { ... };
                 *   })());
                 */
                case "ReturnStatement": {
                    const func = astUtils.getUpperFunction(parent);
                    if (func === null || !astUtils.isCallee(func)) {
                        return null;
                    }
                    currentNode = func.parent;
                    break;
                }
                /*
                 * e.g.
                 *   Array.from([], function() {});
                 *   list.every(function() {});
                 */
                case "CallExpression":
                    if (astUtils.isArrayFromMethod(parent.callee)) {
                        if (parent.arguments.length >= 2 &&
                            parent.arguments[1] === currentNode) {
                            return "from";
                        }
                    }
                    if (isTargetMethod(parent.callee)) {
                        if (parent.arguments.length >= 1 &&
                            parent.arguments[0] === currentNode) {
                            return astUtils.getStaticPropertyName(parent.callee);
                        }
                    }
                    return null;
                // Otherwise this node is not target.
                default:
                    return null;
            }
        }
        /* c8 ignore next */
        return null;
    }