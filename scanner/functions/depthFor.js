function depthFor(node) {
    let ret = 0;
    node = node.getParent();
    while (node) {
        ret += 1;
        node = node.getParent();
    }
    return ret;
}