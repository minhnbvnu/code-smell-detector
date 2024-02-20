function checkCallExpression(node) {
                // If this is something like arr.filter(x => /*condition*/), check `condition`
                if (isArrayPredicateFunction(node) && node.arguments.length) {
                    const callback = node.arguments[0];
                    // Inline defined functions
                    if ((callback.type === utils_1.AST_NODE_TYPES.ArrowFunctionExpression ||
                        callback.type === utils_1.AST_NODE_TYPES.FunctionExpression) &&
                        callback.body) {
                        // Two special cases, where we can directly check the node that's returned:
                        // () => something
                        if (callback.body.type !== utils_1.AST_NODE_TYPES.BlockStatement) {
                            return checkNode(callback.body);
                        }
                        // () => { return something; }
                        const callbackBody = callback.body.body;
                        if (callbackBody.length === 1 &&
                            callbackBody[0].type === utils_1.AST_NODE_TYPES.ReturnStatement &&
                            callbackBody[0].argument) {
                            return checkNode(callbackBody[0].argument);
                        }
                        // Potential enhancement: could use code-path analysis to check
                        //   any function with a single return statement
                        // (Value to complexity ratio is dubious however)
                    }
                    // Otherwise just do type analysis on the function as a whole.
                    const returnTypes = (0, tsutils_1.getCallSignaturesOfType)(getNodeType(callback)).map(sig => sig.getReturnType());
                    /* istanbul ignore if */ if (returnTypes.length === 0) {
                        // Not a callable function
                        return;
                    }
                    // Predicate is always necessary if it involves `any` or `unknown`
                    if (returnTypes.some(t => (0, util_1.isTypeAnyType)(t) || (0, util_1.isTypeUnknownType)(t))) {
                        return;
                    }
                    if (!returnTypes.some(isPossiblyFalsy)) {
                        return context.report({
                            node: callback,
                            messageId: 'alwaysTruthyFunc',
                        });
                    }
                    if (!returnTypes.some(isPossiblyTruthy)) {
                        return context.report({
                            node: callback,
                            messageId: 'alwaysFalsyFunc',
                        });
                    }
                }
            }