function parseArgumentExpression() {
                        return doOutsideOfContext(disallowInAndDecoratorContext, parseArgumentOrArrayLiteralElement);
                    }