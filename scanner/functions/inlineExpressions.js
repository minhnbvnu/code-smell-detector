function inlineExpressions(expressions) {
                return expressions.length > 10 ? createCommaListExpression(expressions) : reduceLeft(expressions, factory2.createComma);
            }