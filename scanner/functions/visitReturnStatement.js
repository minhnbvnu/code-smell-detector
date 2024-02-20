function visitReturnStatement(node) {
                return createInlineReturn(visitNode(node.expression, visitor, isExpression), 
                /*location*/
                node);
            }