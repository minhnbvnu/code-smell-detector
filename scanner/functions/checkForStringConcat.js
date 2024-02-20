function checkForStringConcat(node) {
                if (!astUtils.isStringLiteral(node) || !isConcatenation(node.parent)) {
                    return;
                }
                const topBinaryExpr = getTopConcatBinaryExpression(node.parent);
                // Checks whether or not this node had been checked already.
                if (done[topBinaryExpr.range[0]]) {
                    return;
                }
                done[topBinaryExpr.range[0]] = true;
                if (hasNonStringLiteral(topBinaryExpr)) {
                    context.report({
                        node: topBinaryExpr,
                        messageId: "unexpectedStringConcatenation",
                        fix: fixer => fixNonStringBinaryExpression(fixer, node)
                    });
                }
            }