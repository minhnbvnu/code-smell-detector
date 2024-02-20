function createMethodDescriptorForwarder(modifiers, name, descriptorName) {
                modifiers = visitNodes2(modifiers, (node) => isStaticModifier(node) ? node : void 0, isModifier);
                return factory2.createGetAccessorDeclaration(modifiers, name, [], 
                /*type*/
                void 0, factory2.createBlock([
                    factory2.createReturnStatement(factory2.createPropertyAccessExpression(descriptorName, factory2.createIdentifier("value")))
                ]));
            }