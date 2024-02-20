function createAccessorPropertyDescriptorObject(node, modifiers) {
                return factory2.createObjectLiteralExpression([
                    createDescriptorMethod(node, node.name, modifiers, 
                    /*asteriskToken*/
                    void 0, "get", [], factory2.createBlock([
                        factory2.createReturnStatement(factory2.createPropertyAccessExpression(factory2.createThis(), factory2.getGeneratedPrivateNameForNode(node.name)))
                    ])),
                    createDescriptorMethod(node, node.name, modifiers, 
                    /*asteriskToken*/
                    void 0, "set", [factory2.createParameterDeclaration(
                        /*modifiers*/
                        void 0, 
                        /*dotDotDotToken*/
                        void 0, "value")], factory2.createBlock([
                        factory2.createExpressionStatement(factory2.createAssignment(factory2.createPropertyAccessExpression(factory2.createThis(), factory2.getGeneratedPrivateNameForNode(node.name)), factory2.createIdentifier("value")))
                    ]))
                ]);
            }