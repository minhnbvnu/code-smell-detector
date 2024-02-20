function createSetAccessorDescriptorObject(node, modifiers) {
                return factory2.createObjectLiteralExpression([
                    createDescriptorMethod(node, node.name, modifiers, 
                    /*asteriskToken*/
                    void 0, "set", visitNodes2(node.parameters, visitor, isParameter), visitNode(node.body, visitor, isBlock))
                ]);
            }