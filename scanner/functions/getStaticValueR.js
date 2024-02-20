function getStaticValueR(node, initialScope) {
        if (node != null && Object.hasOwnProperty.call(operations, node.type)) {
            return operations[node.type](node, initialScope);
        }
        return null;
    }