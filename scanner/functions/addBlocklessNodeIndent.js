function addBlocklessNodeIndent(node) {
                if (node.type !== "BlockStatement") {
                    const lastParentToken = sourceCode.getTokenBefore(node, astUtils.isNotOpeningParenToken);
                    let firstBodyToken = sourceCode.getFirstToken(node);
                    let lastBodyToken = sourceCode.getLastToken(node);
                    while (astUtils.isOpeningParenToken(sourceCode.getTokenBefore(firstBodyToken)) &&
                        astUtils.isClosingParenToken(sourceCode.getTokenAfter(lastBodyToken))) {
                        firstBodyToken = sourceCode.getTokenBefore(firstBodyToken);
                        lastBodyToken = sourceCode.getTokenAfter(lastBodyToken);
                    }
                    offsets.setDesiredOffsets([firstBodyToken.range[0], lastBodyToken.range[1]], lastParentToken, 1);
                }
            }