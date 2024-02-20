function visitArrayLiteralExpression(node) {
                return visitElements(node.elements, 
                /*leadingElement*/
                void 0, 
                /*location*/
                void 0, node.multiLine);
            }