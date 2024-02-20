function createMethodDescriptorObject(node, modifiers) {
                return factory2.createObjectLiteralExpression([
                    createDescriptorMethod(node, node.name, modifiers, node.asteriskToken, "value", visitNodes2(node.parameters, visitor, isParameter), visitNode(node.body, visitor, isBlock))
                ]);
            }