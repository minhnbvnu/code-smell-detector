function invertExpression(node) {
                if (node.type === "BinaryExpression" && Object.prototype.hasOwnProperty.call(OPERATOR_INVERSES, node.operator)) {
                    const operatorToken = sourceCode.getFirstTokenBetween(node.left, node.right, token => token.value === node.operator);
                    const text = sourceCode.getText();
                    return text.slice(node.range[0], operatorToken.range[0]) + OPERATOR_INVERSES[node.operator] + text.slice(operatorToken.range[1], node.range[1]);
                }
                if (astUtils.getPrecedence(node) < astUtils.getPrecedence({ type: "UnaryExpression" })) {
                    return `!(${astUtils.getParenthesisedText(sourceCode, node)})`;
                }
                return `!${astUtils.getParenthesisedText(sourceCode, node)}`;
            }