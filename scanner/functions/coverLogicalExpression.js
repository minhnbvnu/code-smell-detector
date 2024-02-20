function coverLogicalExpression(path) {
    const T = this.types;
    if (path.parentPath.node.type === 'LogicalExpression') {
        return; // already processed
    }
    const leaves = [];
    this.findLeaves(path.node, leaves);
    const b = this.cov.newBranch(
        'binary-expr',
        path.node.loc,
        this.reportLogic
    );
    for (let i = 0; i < leaves.length; i += 1) {
        const leaf = leaves[i];
        const hint = this.hintFor(leaf.node);
        if (hint === 'next') {
            continue;
        }

        if (this.reportLogic) {
            const increment = this.getBranchLogicIncrement(
                leaf,
                b,
                leaf.node.loc
            );
            if (!increment[0]) {
                continue;
            }
            leaf.parent[leaf.property] = T.sequenceExpression([
                increment[0],
                increment[1]
            ]);
            continue;
        }

        const increment = this.getBranchIncrement(b, leaf.node.loc);
        if (!increment) {
            continue;
        }
        leaf.parent[leaf.property] = T.sequenceExpression([
            increment,
            leaf.node
        ]);
    }
}