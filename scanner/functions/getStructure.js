function getStructure(tree, localNames) {
    const meth = localNames ? 'getRelativeName' : 'getQualifiedName';
    const visitor = {
        nodes: [],
        onSummary(node) {
            this.nodes.push('g:' + node[meth]());
        },
        onDetail(node) {
            this.nodes.push('f:' + node[meth]());
        }
    };
    tree.visit(visitor);
    return visitor.nodes;
}