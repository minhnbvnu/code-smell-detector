function checkSpacingForForOfStatement(node) {
                if (node.await) {
                    checkSpacingBefore(sourceCode.getFirstToken(node, 0));
                    checkSpacingAfter(sourceCode.getFirstToken(node, 1));
                }
                else {
                    checkSpacingAroundFirstToken(node);
                }
                const ofToken = sourceCode.getTokenBefore(node.right, astUtils.isNotOpeningParenToken);
                const previousToken = sourceCode.getTokenBefore(ofToken);
                if (previousToken.type !== "PrivateIdentifier") {
                    checkSpacingBefore(ofToken);
                }
                checkSpacingAfter(ofToken);
            }