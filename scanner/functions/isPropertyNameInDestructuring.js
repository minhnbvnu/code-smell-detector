function isPropertyNameInDestructuring(node) {
        const parent = node.parent;
        return ((!parent.computed &&
            parent.type === "Property" &&
            parent.parent.type === "ObjectPattern" &&
            parent.key === node));
    }