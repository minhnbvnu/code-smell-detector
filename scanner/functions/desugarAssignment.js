function desugarAssignment(node) {
    var lhs = node.children[0];
    var rhs = desugarExpression(node.children[1]);
    switch (lhs.type) {
      case OBJECT_INIT:
        return withTemp(rhs, function(tmp) {
            return desugarObjectAssignment(lhs, tmp);
        });

      case ARRAY_INIT:
        return withTemp(rhs, function(tmp) {
            return desugarArrayAssignment(lhs, tmp);
        });
    }
    return node.synth({
        type: ASSIGN,
        assignOp: node.assignOp,
        children: [lhs, rhs],
        blockComment: node.blockComment
    });
}