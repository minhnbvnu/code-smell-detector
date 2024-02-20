function reportUnexpectedUnnamedFunction(node) {
                context.report({
                    node,
                    messageId: "unnamed",
                    loc: astUtils.getFunctionHeadLoc(node, sourceCode),
                    data: { name: astUtils.getFunctionNameWithKind(node) }
                });
            }