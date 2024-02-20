function bindStaticPropertyAssignment(node) {
                Debug.assert(!isIdentifier(node));
                setParent(node.expression, node);
                bindPropertyAssignment(node.expression, node, 
                /*isPrototypeProperty*/
                false, 
                /*containerIsClass*/
                false);
            }