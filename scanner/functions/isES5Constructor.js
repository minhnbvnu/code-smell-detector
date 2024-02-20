function isES5Constructor(node) {
        return (node.id && startsWithUpperCase(node.id.name));
    }