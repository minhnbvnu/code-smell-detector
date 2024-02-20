function isRenamedInDestructuring(node) {
        const parent = node.parent;
        return ((!parent.computed &&
            parent.type === "Property" &&
            parent.parent.type === "ObjectPattern" &&
            parent.value !== node &&
            parent.key === node));
    }