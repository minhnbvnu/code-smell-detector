function parenthesizeConditionOfConditionalExpression(condition) {
                const conditionalPrecedence = getOperatorPrecedence(224 /* ConditionalExpression */, 57 /* QuestionToken */);
                const emittedCondition = skipPartiallyEmittedExpressions(condition);
                const conditionPrecedence = getExpressionPrecedence(emittedCondition);
                if (compareValues(conditionPrecedence, conditionalPrecedence) !== 1 /* GreaterThan */) {
                    return factory2.createParenthesizedExpression(condition);
                }
                return condition;
            }