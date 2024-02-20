function checkSpacingForForInStatement(node) {
                checkSpacingAroundFirstToken(node);
                const inToken = sourceCode.getTokenBefore(node.right, astUtils.isNotOpeningParenToken);
                const previousToken = sourceCode.getTokenBefore(inToken);
                if (previousToken.type !== "PrivateIdentifier") {
                    checkSpacingBefore(inToken);
                }
                checkSpacingAfter(inToken);
            }