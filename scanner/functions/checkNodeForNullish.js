function checkNodeForNullish(node) {
                const type = getNodeType(node);
                // Conditional is always necessary if it involves `any` or `unknown`
                if ((0, util_1.isTypeAnyType)(type) || (0, util_1.isTypeUnknownType)(type)) {
                    return;
                }
                let messageId = null;
                if ((0, util_1.isTypeFlagSet)(type, ts.TypeFlags.Never)) {
                    messageId = 'never';
                }
                else if (!isPossiblyNullish(type)) {
                    // Since typescript array index signature types don't represent the
                    //  possibility of out-of-bounds access, if we're indexing into an array
                    //  just skip the check, to avoid false positives
                    if (!isArrayIndexExpression(node) &&
                        !(node.type === utils_1.AST_NODE_TYPES.ChainExpression &&
                            node.expression.type !== utils_1.AST_NODE_TYPES.TSNonNullExpression &&
                            optionChainContainsOptionArrayIndex(node.expression))) {
                        messageId = 'neverNullish';
                    }
                }
                else if (isAlwaysNullish(type)) {
                    messageId = 'alwaysNullish';
                }
                if (messageId) {
                    context.report({ node, messageId });
                }
            }