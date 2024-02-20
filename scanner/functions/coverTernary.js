function coverTernary(path) {
    const n = path.node;
    const branch = this.cov.newBranch('cond-expr', path.node.loc);
    const cHint = this.hintFor(n.consequent);
    const aHint = this.hintFor(n.alternate);

    if (cHint !== 'next') {
        this.insertBranchCounter(path.get('consequent'), branch);
    }
    if (aHint !== 'next') {
        this.insertBranchCounter(path.get('alternate'), branch);
    }
}