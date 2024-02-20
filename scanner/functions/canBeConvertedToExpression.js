function canBeConvertedToExpression(body, head) {
            return body.statements.length === 1 && (isReturnStatement(head) && !!head.expression);
        }