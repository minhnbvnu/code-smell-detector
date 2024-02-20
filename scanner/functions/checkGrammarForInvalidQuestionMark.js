function checkGrammarForInvalidQuestionMark(questionToken, message) {
                return !!questionToken && grammarErrorOnNode(questionToken, message);
            }