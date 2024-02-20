function isUnhandledPromise(checker, node) {
                // First, check expressions whose resulting types may not be promise-like
                if (node.type === utils_1.AST_NODE_TYPES.SequenceExpression) {
                    // Any child in a comma expression could return a potentially unhandled
                    // promise, so we check them all regardless of whether the final returned
                    // value is promise-like.
                    return node.expressions.some(item => isUnhandledPromise(checker, item));
                }
                if (!options.ignoreVoid &&
                    node.type === utils_1.AST_NODE_TYPES.UnaryExpression &&
                    node.operator === 'void') {
                    // Similarly, a `void` expression always returns undefined, so we need to
                    // see what's inside it without checking the type of the overall expression.
                    return isUnhandledPromise(checker, node.argument);
                }
                // Check the type. At this point it can't be unhandled if it isn't a promise
                if (!isPromiseLike(checker, parserServices.esTreeNodeToTSNodeMap.get(node))) {
                    return false;
                }
                if (node.type === utils_1.AST_NODE_TYPES.CallExpression) {
                    // If the outer expression is a call, it must be either a `.then()` or
                    // `.catch()` that handles the promise.
                    return (!isPromiseCatchCallWithHandler(node) &&
                        !isPromiseThenCallWithRejectionHandler(node) &&
                        !isPromiseFinallyCallWithHandler(node));
                }
                else if (node.type === utils_1.AST_NODE_TYPES.ConditionalExpression) {
                    // We must be getting the promise-like value from one of the branches of the
                    // ternary. Check them directly.
                    return (isUnhandledPromise(checker, node.alternate) ||
                        isUnhandledPromise(checker, node.consequent));
                }
                else if (node.type === utils_1.AST_NODE_TYPES.MemberExpression ||
                    node.type === utils_1.AST_NODE_TYPES.Identifier ||
                    node.type === utils_1.AST_NODE_TYPES.NewExpression) {
                    // If it is just a property access chain or a `new` call (e.g. `foo.bar` or
                    // `new Promise()`), the promise is not handled because it doesn't have the
                    // necessary then/catch call at the end of the chain.
                    return true;
                }
                else if (node.type === utils_1.AST_NODE_TYPES.LogicalExpression) {
                    return (isUnhandledPromise(checker, node.left) ||
                        isUnhandledPromise(checker, node.right));
                }
                // We conservatively return false for all other types of expressions because
                // we don't want to accidentally fail if the promise is handled internally but
                // we just can't tell.
                return false;
            }