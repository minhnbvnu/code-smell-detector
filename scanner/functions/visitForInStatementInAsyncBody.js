function visitForInStatementInAsyncBody(node) {
                return factory2.updateForInStatement(node, isVariableDeclarationListWithCollidingName(node.initializer) ? visitVariableDeclarationListWithCollidingNames(node.initializer, 
                /*hasReceiver*/
                true) : Debug.checkDefined(visitNode(node.initializer, visitor, isForInitializer)), Debug.checkDefined(visitNode(node.expression, visitor, isExpression)), visitIterationBody(node.statement, asyncBodyVisitor, context));
            }