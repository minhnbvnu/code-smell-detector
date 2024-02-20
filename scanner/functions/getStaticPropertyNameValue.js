function getStaticPropertyNameValue(node, initialScope) {
        const nameNode = node.type === "Property" ? node.key : node.property;
        if (node.computed) {
            return getStaticValueR(nameNode, initialScope);
        }
        if (nameNode.type === "Identifier") {
            return { value: nameNode.name };
        }
        if (nameNode.type === "Literal") {
            if (nameNode.bigint) {
                return { value: nameNode.bigint };
            }
            return { value: String(nameNode.value) };
        }
        return null;
    }