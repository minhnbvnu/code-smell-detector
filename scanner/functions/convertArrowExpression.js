function convertArrowExpression(path) {
    const n = path.node;
    const T = this.types;
    if (!T.isBlockStatement(n.body)) {
        const bloc = n.body.loc;
        if (n.expression === true) {
            n.expression = false;
        }
        n.body = T.blockStatement([T.returnStatement(n.body)]);
        // restore body location
        n.body.loc = bloc;
        // set up the location for the return statement so it gets
        // instrumented
        n.body.body[0].loc = bloc;
    }
}