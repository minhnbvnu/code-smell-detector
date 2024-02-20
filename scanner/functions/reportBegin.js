function reportBegin(node, messageId, match, refChar) {
                const type = node.type.toLowerCase(), commentIdentifier = type === "block" ? "/*" : "//";
                context.report({
                    node,
                    fix(fixer) {
                        const start = node.range[0];
                        let end = start + 2;
                        if (requireSpace) {
                            if (match) {
                                end += match[0].length;
                            }
                            return fixer.insertTextAfterRange([start, end], " ");
                        }
                        end += match[0].length;
                        return fixer.replaceTextRange([start, end], commentIdentifier + (match[1] ? match[1] : ""));
                    },
                    messageId,
                    data: { refChar }
                });
            }