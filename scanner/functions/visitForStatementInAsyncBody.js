function visitForStatementInAsyncBody(node) {
                const initializer = node.initializer;
                return factory2.updateForStatement(node, isVariableDeclarationListWithCollidingName(initializer) ? visitVariableDeclarationListWithCollidingNames(initializer, 
                /*hasReceiver*/
                false) : visitNode(node.initializer, visitor, isForInitializer), visitNode(node.condition, visitor, isExpression), visitNode(node.incrementor, visitor, isExpression), visitIterationBody(node.statement, asyncBodyVisitor, context));
            }