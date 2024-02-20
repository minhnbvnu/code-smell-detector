function reportImpliedEvalCallExpression(node) {
                const [firstArgument] = node.arguments;
                if (firstArgument) {
                    const staticValue = getStaticValue(firstArgument, context.getScope());
                    const isStaticString = staticValue && typeof staticValue.value === "string";
                    const isString = isStaticString || isEvaluatedString(firstArgument);
                    if (isString) {
                        context.report({
                            node,
                            messageId: "impliedEval"
                        });
                    }
                }
            }