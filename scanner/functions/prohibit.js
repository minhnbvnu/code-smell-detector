function prohibit(node) {
                if (node.operator !== "=" && !astUtils.isLogicalAssignmentOperator(node.operator)) {
                    context.report({
                        node,
                        messageId: "unexpected",
                        data: { operator: node.operator },
                        fix(fixer) {
                            if (canBeFixed(node.left)) {
                                const firstToken = sourceCode.getFirstToken(node);
                                const operatorToken = getOperatorToken(node);
                                const leftText = sourceCode.getText().slice(node.range[0], operatorToken.range[0]);
                                const newOperator = node.operator.slice(0, -1);
                                let rightText;
                                // Check for comments that would be duplicated.
                                if (sourceCode.commentsExistBetween(firstToken, operatorToken)) {
                                    return null;
                                }
                                // If this change would modify precedence (e.g. `foo *= bar + 1` => `foo = foo * (bar + 1)`), parenthesize the right side.
                                if (astUtils.getPrecedence(node.right) <= astUtils.getPrecedence({ type: "BinaryExpression", operator: newOperator }) &&
                                    !astUtils.isParenthesised(sourceCode, node.right)) {
                                    rightText = `${sourceCode.text.slice(operatorToken.range[1], node.right.range[0])}(${sourceCode.getText(node.right)})`;
                                }
                                else {
                                    const tokenAfterOperator = sourceCode.getTokenAfter(operatorToken, { includeComments: true });
                                    let rightTextPrefix = "";
                                    if (operatorToken.range[1] === tokenAfterOperator.range[0] &&
                                        !astUtils.canTokensBeAdjacent({ type: "Punctuator", value: newOperator }, tokenAfterOperator)) {
                                        rightTextPrefix = " "; // foo+=+bar -> foo= foo+ +bar
                                    }
                                    rightText = `${rightTextPrefix}${sourceCode.text.slice(operatorToken.range[1], node.range[1])}`;
                                }
                                return fixer.replaceText(node, `${leftText}= ${leftText}${newOperator}${rightText}`);
                            }
                            return null;
                        }
                    });
                }
            }