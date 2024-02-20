function visitForOfStatementInAsyncBody(node) {
                return factory2.updateForOfStatement(node, visitNode(node.awaitModifier, visitor, isAwaitKeyword), isVariableDeclarationListWithCollidingName(node.initializer) ? visitVariableDeclarationListWithCollidingNames(node.initializer, 
                /*hasReceiver*/
                true) : Debug.checkDefined(visitNode(node.initializer, visitor, isForInitializer)), Debug.checkDefined(visitNode(node.expression, visitor, isExpression)), visitIterationBody(node.statement, asyncBodyVisitor, context));
            }