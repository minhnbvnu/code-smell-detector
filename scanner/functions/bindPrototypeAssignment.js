function bindPrototypeAssignment(node) {
                setParent(node.left, node);
                setParent(node.right, node);
                bindPropertyAssignment(node.left.expression, node.left, 
                /*isPrototypeProperty*/
                false, 
                /*containerIsClass*/
                true);
            }