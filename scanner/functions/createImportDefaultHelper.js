function createImportDefaultHelper(expression) {
                context.requestEmitHelper(importDefaultHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__importDefault"), 
                /*typeArguments*/
                void 0, [expression]);
            }