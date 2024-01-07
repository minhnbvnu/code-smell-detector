function findNode(node, test) {
    if (test(node))
        return node;

    const children = node._children;
    const len = children.length;
    for (let i = 0; i < len; ++i) {
        const result = findNode(children[i], test);
        if (result)
            return result;
    }

    return null;
}