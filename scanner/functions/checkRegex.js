function checkRegex(pattern, node, regexNode, uFlag) {
                let ast;
                try {
                    ast = parser.parsePattern(pattern, 0, pattern.length, uFlag);
                }
                catch {
                    // ignore regex syntax errors
                    return;
                }
                regexpp.visitRegExpAST(ast, {
                    onCapturingGroupEnter(group) {
                        if (!group.name) {
                            const rawText = sourceCode.getText(regexNode);
                            const suggest = suggestIfPossible(group.start, pattern, rawText, regexNode);
                            context.report({
                                node,
                                messageId: "required",
                                data: {
                                    group: group.raw
                                },
                                suggest
                            });
                        }
                    }
                });
            }