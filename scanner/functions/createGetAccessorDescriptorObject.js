function createGetAccessorDescriptorObject(node, modifiers) {
                return factory2.createObjectLiteralExpression([
                    createDescriptorMethod(node, node.name, modifiers, 
                    /*asteriskToken*/
                    void 0, "get", [], visitNode(node.body, visitor, isBlock))
                ]);
            }