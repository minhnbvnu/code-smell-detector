function transformPromiseExpressionOfPropertyAccess(returnContextNode, node, transformer, hasContinuation, continuationArgName) {
            if (shouldReturn(returnContextNode, transformer)) {
                let returnValue = getSynthesizedDeepClone(node);
                if (hasContinuation) {
                    returnValue = factory.createAwaitExpression(returnValue);
                }
                return [factory.createReturnStatement(returnValue)];
            }
            return createVariableOrAssignmentOrExpressionStatement(continuationArgName, factory.createAwaitExpression(node), 
            /*typeAnnotation*/
            void 0);
        }