function getIdentifiersFromErrorSpanExpression(expression, checker) {
            if (isPropertyAccessExpression(expression.parent) && isIdentifier(expression.parent.expression)) {
                return { identifiers: [expression.parent.expression], isCompleteFix: true };
            }
            if (isIdentifier(expression)) {
                return { identifiers: [expression], isCompleteFix: true };
            }
            if (isBinaryExpression(expression)) {
                let sides;
                let isCompleteFix = true;
                for (const side of [expression.left, expression.right]) {
                    const type = checker.getTypeAtLocation(side);
                    if (checker.getPromisedTypeOfPromise(type)) {
                        if (!isIdentifier(side)) {
                            isCompleteFix = false;
                            continue;
                        }
                        (sides || (sides = [])).push(side);
                    }
                }
                return sides && { identifiers: sides, isCompleteFix };
            }
        }