function getConditionalInfo(expression, checker) {
            const condition = expression.condition;
            const finalExpression = getFinalExpressionInChain(expression.whenTrue);
            if (!finalExpression || checker.isNullableType(checker.getTypeAtLocation(finalExpression))) {
                return { error: getLocaleSpecificMessage(Diagnostics.Could_not_find_convertible_access_expression) };
            }
            if ((isPropertyAccessExpression(condition) || isIdentifier(condition)) && getMatchingStart(condition, finalExpression.expression)) {
                return { finalExpression, occurrences: [condition], expression };
            }
            else if (isBinaryExpression(condition)) {
                const occurrences = getOccurrencesInExpression(finalExpression.expression, condition);
                return occurrences ? { finalExpression, occurrences, expression } : { error: getLocaleSpecificMessage(Diagnostics.Could_not_find_matching_access_expressions) };
            }
        }