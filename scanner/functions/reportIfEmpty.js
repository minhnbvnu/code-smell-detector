function reportIfEmpty(node) {
                const kind = getKind(node);
                const name = astUtils.getFunctionNameWithKind(node);
                const innerComments = sourceCode.getTokens(node.body, {
                    includeComments: true,
                    filter: astUtils.isCommentToken
                });
                if (!allowed.includes(kind) &&
                    node.body.type === "BlockStatement" &&
                    node.body.body.length === 0 &&
                    innerComments.length === 0) {
                    context.report({
                        node,
                        loc: node.body.loc,
                        messageId: "unexpected",
                        data: { name }
                    });
                }
            }