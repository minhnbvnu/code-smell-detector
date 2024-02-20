function createCreateBindingHelper(module2, inputName, outputName) {
                context.requestEmitHelper(createBindingHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__createBinding"), 
                /*typeArguments*/
                void 0, [factory2.createIdentifier("exports"), module2, inputName, ...outputName ? [outputName] : []]);
            }