function createAssignHelper(attributesSegments) {
                if (getEmitScriptTarget(context.getCompilerOptions()) >= 2 /* ES2015 */) {
                    return factory2.createCallExpression(factory2.createPropertyAccessExpression(factory2.createIdentifier("Object"), "assign"), 
                    /*typeArguments*/
                    void 0, attributesSegments);
                }
                context.requestEmitHelper(assignHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__assign"), 
                /*typeArguments*/
                void 0, attributesSegments);
            }