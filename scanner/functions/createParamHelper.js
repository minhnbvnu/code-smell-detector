function createParamHelper(expression, parameterOffset, location) {
                context.requestEmitHelper(paramHelper);
                return setTextRange(factory2.createCallExpression(getUnscopedHelperName("__param"), 
                /*typeArguments*/
                void 0, [
                    factory2.createNumericLiteral(parameterOffset + ""),
                    expression
                ]), location);
            }