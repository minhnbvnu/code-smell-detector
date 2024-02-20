function containsSameNamedThisProperty(thisProperty, expression) {
                return isPropertyAccessExpression(thisProperty) && thisProperty.expression.kind === 108 /* ThisKeyword */ && forEachChildRecursively(expression, (n) => isMatchingReference(thisProperty, n));
            }