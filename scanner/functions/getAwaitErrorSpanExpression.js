function getAwaitErrorSpanExpression(sourceFile, errorCode, span, cancellationToken, program) {
            const expression = getFixableErrorSpanExpression(sourceFile, span);
            return expression && isMissingAwaitError(sourceFile, errorCode, span, cancellationToken, program) && isInsideAwaitableBody(expression) ? expression : void 0;
        }