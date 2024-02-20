function checkMethodAndReport(node, symbol) {
                if (!symbol) {
                    return;
                }
                const { dangerous, firstParamIsThis } = checkMethod(symbol, ignoreStatic);
                if (dangerous) {
                    context.report({
                        messageId: firstParamIsThis === false
                            ? 'unboundWithoutThisAnnotation'
                            : 'unbound',
                        node,
                    });
                }
            }