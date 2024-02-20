function hasAccessors(node) {
        return node.properties.some(isAccessorProperty);
    }