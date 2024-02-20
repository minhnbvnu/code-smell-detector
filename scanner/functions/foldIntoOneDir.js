function foldIntoOneDir(node, parent) {
    const { children } = node;
    if (children.length === 1 && !children[0].fileCoverage) {
        children[0].parent = parent;
        return foldIntoOneDir(children[0], parent);
    }
    node.children = children.map(child => foldIntoOneDir(child, node));
    return node;
}