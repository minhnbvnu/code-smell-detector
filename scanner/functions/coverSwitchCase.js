function coverSwitchCase(path) {
    const T = this.types;
    const b = this.getAttr(path.parentPath.node, 'branchName');
    /* istanbul ignore if: paranoid check */
    if (b === null) {
        throw new Error('Unable to get switch branch name');
    }
    const increment = this.getBranchIncrement(b, path.node.loc);
    path.node.consequent.unshift(T.expressionStatement(increment));
}