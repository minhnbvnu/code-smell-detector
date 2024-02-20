function visitShorthandPropertyAssignment(node) {
                return setTextRange(factory2.createPropertyAssignment(node.name, visitIdentifier(factory2.cloneNode(node.name))), 
                /*location*/
                node);
            }