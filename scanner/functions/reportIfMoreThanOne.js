function reportIfMoreThanOne({ expressionCount, previous, optionallyChainedCode, sourceCode, context, shouldHandleChainedAnds, }) {
        if (expressionCount > 1) {
            if (shouldHandleChainedAnds &&
                previous.right.type === utils_1.AST_NODE_TYPES.BinaryExpression) {
                let operator = previous.right.operator;
                if (previous.right.operator === '!==' &&
                    // TODO(#4820): Use the type checker to know whether this is `null`
                    previous.right.right.type === utils_1.AST_NODE_TYPES.Literal &&
                    previous.right.right.raw === 'null') {
                    // case like foo !== null && foo.bar !== null
                    operator = '!=';
                }
                // case like foo && foo.bar !== someValue
                optionallyChainedCode += ` ${operator} ${sourceCode.getText(previous.right.right)}`;
            }
            context.report({
                node: previous,
                messageId: 'preferOptionalChain',
                suggest: [
                    {
                        messageId: 'optionalChainSuggest',
                        fix: (fixer) => [
                            fixer.replaceText(previous, `${shouldHandleChainedAnds ? '' : '!'}${optionallyChainedCode}`),
                        ],
                    },
                ],
            });
        }
    }