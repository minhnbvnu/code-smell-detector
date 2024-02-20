function nodeToJSON(node) {
    if (!node) {
        return node;
    }

    const { type, name, range } = node;
    if (node.type === "Identifier") {
        return { type, name, range };
    }
    return { type, range };
}