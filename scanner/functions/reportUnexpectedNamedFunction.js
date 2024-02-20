function reportUnexpectedNamedFunction(node) {
                context.report({
                    node,
                    messageId: "named",
                    loc: astUtils.getFunctionHeadLoc(node, sourceCode),
                    data: { name: astUtils.getFunctionNameWithKind(node) }
                });
            }