function transformDecorator(decorator) {
                const expression = visitNode(decorator.expression, visitor, isExpression);
                setEmitFlags(expression, 3072 /* NoComments */);
                return expression;
            }