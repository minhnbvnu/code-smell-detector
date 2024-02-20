function visitFunctionExpression(node) {
                if (node.asteriskToken) {
                    node = setOriginalNode(setTextRange(factory2.createFunctionExpression(
                    /*modifiers*/
                    void 0, 
                    /*asteriskToken*/
                    void 0, node.name, 
                    /*typeParameters*/
                    void 0, visitParameterList(node.parameters, visitor, context), 
                    /*type*/
                    void 0, transformGeneratorFunctionBody(node.body)), 
                    /*location*/
                    node), node);
                }
                else {
                    const savedInGeneratorFunctionBody = inGeneratorFunctionBody;
                    const savedInStatementContainingYield = inStatementContainingYield;
                    inGeneratorFunctionBody = false;
                    inStatementContainingYield = false;
                    node = visitEachChild(node, visitor, context);
                    inGeneratorFunctionBody = savedInGeneratorFunctionBody;
                    inStatementContainingYield = savedInStatementContainingYield;
                }
                return node;
            }