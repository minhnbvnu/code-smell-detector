function createSetAccessorDescriptorForwarder(modifiers, name, descriptorName) {
                modifiers = visitNodes2(modifiers, (node) => isStaticModifier(node) ? node : void 0, isModifier);
                return factory2.createSetAccessorDeclaration(modifiers, name, [factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, "value")], factory2.createBlock([
                    factory2.createReturnStatement(factory2.createFunctionCallCall(factory2.createPropertyAccessExpression(descriptorName, factory2.createIdentifier("set")), factory2.createThis(), [factory2.createIdentifier("value")]))
                ]));
            }