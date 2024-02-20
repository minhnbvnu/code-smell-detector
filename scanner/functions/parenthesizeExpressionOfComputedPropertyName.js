function parenthesizeExpressionOfComputedPropertyName(expression) {
                return isCommaSequence(expression) ? factory2.createParenthesizedExpression(expression) : expression;
            }