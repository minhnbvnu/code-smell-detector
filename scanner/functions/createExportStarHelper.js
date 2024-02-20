function createExportStarHelper(moduleExpression, exportsExpression = factory2.createIdentifier("exports")) {
                context.requestEmitHelper(exportStarHelper);
                context.requestEmitHelper(createBindingHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__exportStar"), 
                /*typeArguments*/
                void 0, [moduleExpression, exportsExpression]);
            }