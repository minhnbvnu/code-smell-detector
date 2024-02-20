function visitVariableDeclarationListWithCollidingNames(node, hasReceiver) {
                hoistVariableDeclarationList(node);
                const variables = getInitializedVariables(node);
                if (variables.length === 0) {
                    if (hasReceiver) {
                        return visitNode(factory2.converters.convertToAssignmentElementTarget(node.declarations[0].name), visitor, isExpression);
                    }
                    return void 0;
                }
                return factory2.inlineExpressions(map(variables, transformInitializedVariable));
            }