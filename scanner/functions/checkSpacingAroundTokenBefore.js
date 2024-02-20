function checkSpacingAroundTokenBefore(node) {
                if (node) {
                    const token = sourceCode.getTokenBefore(node, astUtils.isKeywordToken);
                    checkSpacingAround(token);
                }
            }