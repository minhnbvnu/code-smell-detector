function isEndOfArrowBlock(lastToken) {
                if (!astUtils.isClosingBraceToken(lastToken)) {
                    return false;
                }
                const node = sourceCode.getNodeByRangeIndex(lastToken.range[0]);
                return (node.type === "BlockStatement" &&
                    node.parent.type === "ArrowFunctionExpression");
            }