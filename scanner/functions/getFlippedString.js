function getFlippedString(node) {
                const operatorToken = sourceCode.getFirstTokenBetween(node.left, node.right, token => token.value === node.operator);
                const lastLeftToken = sourceCode.getTokenBefore(operatorToken);
                const firstRightToken = sourceCode.getTokenAfter(operatorToken);
                const source = sourceCode.getText();
                const leftText = source.slice(node.range[0], lastLeftToken.range[1]);
                const textBeforeOperator = source.slice(lastLeftToken.range[1], operatorToken.range[0]);
                const textAfterOperator = source.slice(operatorToken.range[1], firstRightToken.range[0]);
                const rightText = source.slice(firstRightToken.range[0], node.range[1]);
                const tokenBefore = sourceCode.getTokenBefore(node);
                const tokenAfter = sourceCode.getTokenAfter(node);
                let prefix = "";
                let suffix = "";
                if (tokenBefore &&
                    tokenBefore.range[1] === node.range[0] &&
                    !astUtils.canTokensBeAdjacent(tokenBefore, firstRightToken)) {
                    prefix = " ";
                }
                if (tokenAfter &&
                    node.range[1] === tokenAfter.range[0] &&
                    !astUtils.canTokensBeAdjacent(lastLeftToken, tokenAfter)) {
                    suffix = " ";
                }
                return (prefix +
                    rightText +
                    textBeforeOperator +
                    OPERATOR_FLIP_MAP[operatorToken.value] +
                    textAfterOperator +
                    leftText +
                    suffix);
            }