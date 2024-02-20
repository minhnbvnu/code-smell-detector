function hoistBindingElement(node) {
                if (isBindingPattern(node.name)) {
                    for (const element of node.name.elements) {
                        if (!isOmittedExpression(element)) {
                            hoistBindingElement(element);
                        }
                    }
                }
                else {
                    hoistVariableDeclaration(factory2.cloneNode(node.name));
                }
            }