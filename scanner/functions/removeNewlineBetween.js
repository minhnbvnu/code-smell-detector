function removeNewlineBetween(firstToken, secondToken) {
                const textRange = [firstToken.range[1], secondToken.range[0]];
                const textBetween = sourceCode.text.slice(textRange[0], textRange[1]);
                // Don't do a fix if there is a comment between the tokens
                if (textBetween.trim()) {
                    return null;
                }
                return fixer => fixer.replaceTextRange(textRange, " ");
            }