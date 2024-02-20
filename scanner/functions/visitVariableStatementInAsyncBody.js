function visitVariableStatementInAsyncBody(node) {
                if (isVariableDeclarationListWithCollidingName(node.declarationList)) {
                    const expression = visitVariableDeclarationListWithCollidingNames(node.declarationList, 
                    /*hasReceiver*/
                    false);
                    return expression ? factory2.createExpressionStatement(expression) : void 0;
                }
                return visitEachChild(node, visitor, context);
            }