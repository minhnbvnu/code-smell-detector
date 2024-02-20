function getTokens(node) {
                const arrow = sourceCode.getTokenBefore(node.body, astUtils.isArrowToken);
                return {
                    before: sourceCode.getTokenBefore(arrow),
                    arrow,
                    after: sourceCode.getTokenAfter(arrow)
                };
            }