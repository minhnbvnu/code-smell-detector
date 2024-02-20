function checkSpacingForFunction(node) {
                const firstToken = node && sourceCode.getFirstToken(node);
                if (firstToken &&
                    ((firstToken.type === "Keyword" && firstToken.value === "function") ||
                        firstToken.value === "async")) {
                    checkSpacingBefore(firstToken);
                }
            }