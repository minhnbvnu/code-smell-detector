function validateStatement(node, keywordName) {
                const option = getOption(keywordName);
                if (node.type === "BlockStatement" || option === "any") {
                    return;
                }
                const tokenBefore = sourceCode.getTokenBefore(node);
                if (tokenBefore.loc.end.line === node.loc.start.line && option === "below") {
                    context.report({
                        node,
                        messageId: "expectLinebreak",
                        fix: fixer => fixer.insertTextBefore(node, "\n")
                    });
                }
                else if (tokenBefore.loc.end.line !== node.loc.start.line && option === "beside") {
                    context.report({
                        node,
                        messageId: "expectNoLinebreak",
                        fix(fixer) {
                            if (sourceCode.getText().slice(tokenBefore.range[1], node.range[0]).trim()) {
                                return null;
                            }
                            return fixer.replaceTextRange([tokenBefore.range[1], node.range[0]], " ");
                        }
                    });
                }
            }