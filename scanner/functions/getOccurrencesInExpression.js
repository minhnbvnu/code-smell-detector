function getOccurrencesInExpression(matchTo, expression) {
            const occurrences = [];
            while (isBinaryExpression(expression) && expression.operatorToken.kind === 55 /* AmpersandAmpersandToken */) {
                const match = getMatchingStart(skipParentheses(matchTo), skipParentheses(expression.right));
                if (!match) {
                    break;
                }
                occurrences.push(match);
                matchTo = match;
                expression = expression.left;
            }
            const finalMatch = getMatchingStart(matchTo, expression);
            if (finalMatch) {
                occurrences.push(finalMatch);
            }
            return occurrences.length > 0 ? occurrences : void 0;
        }