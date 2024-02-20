function padRecursively(node) {
    for (const child of node.children) {
        padRecursively(child);
    }
    node.children = (0, pad_between_nodes_1.padBetweenNodes)(node.children);
}