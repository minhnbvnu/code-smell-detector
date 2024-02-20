function getLastToken(node) {
                const lastToken = sourceCode.getLastToken(node);
                if (lastToken.type === "Punctuator" && lastToken.value === ";") {
                    const prevToken = sourceCode.getTokenBefore(lastToken);
                    if (prevToken.loc.end.line !== lastToken.loc.start.line) {
                        return prevToken;
                    }
                }
                return lastToken;
            }