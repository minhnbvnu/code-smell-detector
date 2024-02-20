function createDecorateHelper(decoratorExpressions, target, memberName, descriptor) {
                context.requestEmitHelper(decorateHelper);
                const argumentsArray = [];
                argumentsArray.push(factory2.createArrayLiteralExpression(decoratorExpressions, 
                /*multiLine*/
                true));
                argumentsArray.push(target);
                if (memberName) {
                    argumentsArray.push(memberName);
                    if (descriptor) {
                        argumentsArray.push(descriptor);
                    }
                }
                return factory2.createCallExpression(getUnscopedHelperName("__decorate"), 
                /*typeArguments*/
                void 0, argumentsArray);
            }