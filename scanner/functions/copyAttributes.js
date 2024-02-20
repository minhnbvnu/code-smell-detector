function copyAttributes(oldNode, newNode) {
            newNode.attributes = oldNode.attributes;
            setProperties(newNode, oldNode.getAllProperties());
        }