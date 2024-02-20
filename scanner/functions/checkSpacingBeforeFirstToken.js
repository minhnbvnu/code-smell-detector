function checkSpacingBeforeFirstToken(node) {
                const firstToken = node && sourceCode.getFirstToken(node);
                if (firstToken && firstToken.type === "Keyword") {
                    checkSpacingBefore(firstToken);
                }
            }