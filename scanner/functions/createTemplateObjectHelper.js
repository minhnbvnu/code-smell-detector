function createTemplateObjectHelper(cooked, raw) {
                context.requestEmitHelper(templateObjectHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__makeTemplateObject"), 
                /*typeArguments*/
                void 0, [cooked, raw]);
            }