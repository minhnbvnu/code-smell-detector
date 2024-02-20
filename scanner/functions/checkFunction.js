function checkFunction(node) {
                const functionConfig = getConfigForFunction(node);
                if (functionConfig === 'ignore') {
                    return;
                }
                let leftToken;
                let rightToken;
                if (node.typeParameters) {
                    leftToken = sourceCode.getLastToken(node.typeParameters);
                    rightToken = sourceCode.getTokenAfter(leftToken);
                }
                else {
                    rightToken = sourceCode.getFirstToken(node, util.isOpeningParenToken);
                    leftToken = sourceCode.getTokenBefore(rightToken);
                }
                // eslint-disable-next-line deprecation/deprecation -- TODO - switch once our min ESLint version is 6.7.0
                const hasSpacing = sourceCode.isSpaceBetweenTokens(leftToken, rightToken);
                if (hasSpacing && functionConfig === 'never') {
                    context.report({
                        node,
                        loc: {
                            start: leftToken.loc.end,
                            end: rightToken.loc.start,
                        },
                        messageId: 'unexpected',
                        fix: fixer => fixer.removeRange([leftToken.range[1], rightToken.range[0]]),
                    });
                }
                else if (!hasSpacing &&
                    functionConfig === 'always' &&
                    (!node.typeParameters || node.id)) {
                    context.report({
                        node,
                        loc: rightToken.loc,
                        messageId: 'missing',
                        fix: fixer => fixer.insertTextAfter(leftToken, ' '),
                    });
                }
            }