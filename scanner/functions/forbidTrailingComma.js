function forbidTrailingComma(node) {
                const lastItem = getLastItem(node);
                if (!lastItem || (node.type === "ImportDeclaration" && lastItem.type !== "ImportSpecifier")) {
                    return;
                }
                const trailingToken = getTrailingToken(node, lastItem);
                if (astUtils.isCommaToken(trailingToken)) {
                    context.report({
                        node: lastItem,
                        loc: trailingToken.loc,
                        messageId: "unexpected",
                        *fix(fixer) {
                            yield fixer.remove(trailingToken);
                            /*
                             * Extend the range of the fix to include surrounding tokens to ensure
                             * that the element after which the comma is removed stays _last_.
                             * This intentionally makes conflicts in fix ranges with rules that may be
                             * adding or removing elements in the same autofix pass.
                             * https://github.com/eslint/eslint/issues/15660
                             */
                            yield fixer.insertTextBefore(sourceCode.getTokenBefore(trailingToken), "");
                            yield fixer.insertTextAfter(sourceCode.getTokenAfter(trailingToken), "");
                        }
                    });
                }
            }