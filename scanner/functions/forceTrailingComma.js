function forceTrailingComma(node) {
                const lastItem = getLastItem(node);
                if (!lastItem || (node.type === "ImportDeclaration" && lastItem.type !== "ImportSpecifier")) {
                    return;
                }
                if (!isTrailingCommaAllowed(lastItem)) {
                    forbidTrailingComma(node);
                    return;
                }
                const trailingToken = getTrailingToken(node, lastItem);
                if (trailingToken.value !== ",") {
                    context.report({
                        node: lastItem,
                        loc: {
                            start: trailingToken.loc.end,
                            end: astUtils.getNextLocation(sourceCode, trailingToken.loc.end)
                        },
                        messageId: "missing",
                        *fix(fixer) {
                            yield fixer.insertTextAfter(trailingToken, ",");
                            /*
                             * Extend the range of the fix to include surrounding tokens to ensure
                             * that the element after which the comma is inserted stays _last_.
                             * This intentionally makes conflicts in fix ranges with rules that may be
                             * adding or removing elements in the same autofix pass.
                             * https://github.com/eslint/eslint/issues/15660
                             */
                            yield fixer.insertTextBefore(trailingToken, "");
                            yield fixer.insertTextAfter(sourceCode.getTokenAfter(trailingToken), "");
                        }
                    });
                }
            }