function makeBlock(path) {
    const T = this.types;
    if (!path.node) {
        path.replaceWith(T.blockStatement([]));
    }
    if (!path.isBlockStatement()) {
        path.replaceWith(T.blockStatement([path.node]));
        path.node.loc = path.node.body[0].loc;
        path.node.body[0].leadingComments = path.node.leadingComments;
        path.node.leadingComments = undefined;
    }
}