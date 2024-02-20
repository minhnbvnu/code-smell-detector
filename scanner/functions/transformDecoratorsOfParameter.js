function transformDecoratorsOfParameter(decorators, parameterOffset) {
                let expressions;
                if (decorators) {
                    expressions = [];
                    for (const decorator of decorators) {
                        const helper = emitHelpers().createParamHelper(transformDecorator(decorator), parameterOffset);
                        setTextRange(helper, decorator.expression);
                        setEmitFlags(helper, 3072 /* NoComments */);
                        expressions.push(helper);
                    }
                }
                return expressions;
            }