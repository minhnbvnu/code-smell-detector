function checkOptionalChain(node, beforeOperator, fix) {
                // We only care if this step in the chain is optional. If just descend
                // from an optional chain, then that's fine.
                if (!node.optional) {
                    return;
                }
                // Since typescript array index signature types don't represent the
                //  possibility of out-of-bounds access, if we're indexing into an array
                //  just skip the check, to avoid false positives
                if (optionChainContainsOptionArrayIndex(node)) {
                    return;
                }
                const nodeToCheck = node.type === utils_1.AST_NODE_TYPES.CallExpression ? node.callee : node.object;
                if (isOptionableExpression(nodeToCheck)) {
                    return;
                }
                const questionDotOperator = (0, util_1.nullThrows)(sourceCode.getTokenAfter(beforeOperator, token => token.type === utils_1.AST_TOKEN_TYPES.Punctuator && token.value === '?.'), util_1.NullThrowsReasons.MissingToken('operator', node.type));
                context.report({
                    node,
                    loc: questionDotOperator.loc,
                    messageId: 'neverOptionalChain',
                    fix(fixer) {
                        return fixer.replaceText(questionDotOperator, fix);
                    },
                });
            }