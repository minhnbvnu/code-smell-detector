function checkSpacingAroundFirstToken(node) {
                const firstToken = node && sourceCode.getFirstToken(node);
                if (firstToken && firstToken.type === "Keyword") {
                    checkSpacingAround(firstToken);
                }
            }