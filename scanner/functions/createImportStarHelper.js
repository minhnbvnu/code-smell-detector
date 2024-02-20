function createImportStarHelper(expression) {
                context.requestEmitHelper(importStarHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__importStar"), 
                /*typeArguments*/
                void 0, [expression]);
            }