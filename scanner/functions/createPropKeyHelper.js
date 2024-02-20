function createPropKeyHelper(expr) {
                context.requestEmitHelper(propKeyHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__propKey"), 
                /*typeArguments*/
                void 0, [expr]);
            }