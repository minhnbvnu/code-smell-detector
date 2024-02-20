function createSuggestion(messageId, range, replacement) {
                return {
                    messageId,
                    data: {
                        original: sourceCode.getText().slice(...range),
                        replacement
                    },
                    fix(fixer) {
                        return fixer.replaceTextRange(range, replacement);
                    }
                };
            }