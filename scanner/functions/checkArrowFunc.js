function checkArrowFunc(node) {
                const body = node.body;
                if (isConditional(body) &&
                    !(allowParens && astUtils.isParenthesised(sourceCode, body)) &&
                    !(onlyOneSimpleParam && !(node.params.length === 1 && node.params[0].type === "Identifier"))) {
                    context.report({
                        node,
                        messageId: "confusing",
                        fix(fixer) {
                            // if `allowParens` is not set to true don't bother wrapping in parens
                            return allowParens && fixer.replaceText(node.body, `(${sourceCode.getText(node.body)})`);
                        }
                    });
                }
            }