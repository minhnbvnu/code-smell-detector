function getBinaryInfo(expression) {
            if (expression.operatorToken.kind !== 55 /* AmpersandAmpersandToken */) {
                return { error: getLocaleSpecificMessage(Diagnostics.Can_only_convert_logical_AND_access_chains) };
            }
            const finalExpression = getFinalExpressionInChain(expression.right);
            if (!finalExpression)
                return { error: getLocaleSpecificMessage(Diagnostics.Could_not_find_convertible_access_expression) };
            const occurrences = getOccurrencesInExpression(finalExpression.expression, expression.left);
            return occurrences ? { finalExpression, occurrences, expression } : { error: getLocaleSpecificMessage(Diagnostics.Could_not_find_matching_access_expressions) };
        }