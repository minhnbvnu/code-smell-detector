function makeChange10(changeTracker, sourceFile, span) {
            const awaitKeyword = tryCast(getTokenAtPosition(sourceFile, span.start), (node) => node.kind === 133 /* AwaitKeyword */);
            const awaitExpression = awaitKeyword && tryCast(awaitKeyword.parent, isAwaitExpression);
            if (!awaitExpression) {
                return;
            }
            let expressionToReplace = awaitExpression;
            const hasSurroundingParens = isParenthesizedExpression(awaitExpression.parent);
            if (hasSurroundingParens) {
                const leftMostExpression = getLeftmostExpression(awaitExpression.expression, 
                /*stopAtCallExpressions*/
                false);
                if (isIdentifier(leftMostExpression)) {
                    const precedingToken = findPrecedingToken(awaitExpression.parent.pos, sourceFile);
                    if (precedingToken && precedingToken.kind !== 103 /* NewKeyword */) {
                        expressionToReplace = awaitExpression.parent;
                    }
                }
            }
            changeTracker.replaceNode(sourceFile, expressionToReplace, awaitExpression.expression);
        }