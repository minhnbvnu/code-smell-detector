function createSpreadArrayHelper(to, from, packFrom) {
                context.requestEmitHelper(spreadArrayHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__spreadArray"), 
                /*typeArguments*/
                void 0, [to, from, packFrom ? immutableTrue() : immutableFalse()]);
            }