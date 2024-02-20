function createForOfBindingStatement(factory2, node, boundValue) {
            if (isVariableDeclarationList(node)) {
                const firstDeclaration = first(node.declarations);
                const updatedDeclaration = factory2.updateVariableDeclaration(firstDeclaration, firstDeclaration.name, 
                /*exclamationToken*/
                void 0, 
                /*type*/
                void 0, boundValue);
                return setTextRange(factory2.createVariableStatement(
                /*modifiers*/
                void 0, factory2.updateVariableDeclarationList(node, [updatedDeclaration])), 
                /*location*/
                node);
            }
            else {
                const updatedExpression = setTextRange(factory2.createAssignment(node, boundValue), 
                /*location*/
                node);
                return setTextRange(factory2.createExpressionStatement(updatedExpression), 
                /*location*/
                node);
            }
        }