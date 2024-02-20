function checkGrammarForInvalidExclamationToken(exclamationToken, message) {
                return !!exclamationToken && grammarErrorOnNode(exclamationToken, message);
            }