function parenthesizeExpressionForDisallowedComma(expression) {
                const emittedExpression = skipPartiallyEmittedExpressions(expression);
                const expressionPrecedence = getExpressionPrecedence(emittedExpression);
                const commaPrecedence = getOperatorPrecedence(223 /* BinaryExpression */, 27 /* CommaToken */);
                return expressionPrecedence > commaPrecedence ? expression : setTextRange(factory2.createParenthesizedExpression(expression), expression);
            }