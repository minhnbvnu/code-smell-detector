function replaceExpressionWithStatements(nodes) {
  this.resync();
  const toSequenceExpression = t.toSequenceExpression(nodes, this.scope);

  if (toSequenceExpression) {
    return this.replaceWith(toSequenceExpression)[0].get("expressions");
  }

  const functionParent = this.getFunctionParent();
  const isParentAsync = functionParent == null ? void 0 : functionParent.is("async");
  const container = t.arrowFunctionExpression([], t.blockStatement(nodes));
  this.replaceWith(t.callExpression(container, []));
  this.traverse(hoistVariablesVisitor);
  const completionRecords = this.get("callee").getCompletionRecords();

  for (const path of completionRecords) {
    if (!path.isExpressionStatement()) continue;
    const loop = path.findParent(path => path.isLoop());

    if (loop) {
      let uid = loop.getData("expressionReplacementReturnUid");

      if (!uid) {
        const callee = this.get("callee");
        uid = callee.scope.generateDeclaredUidIdentifier("ret");
        callee.get("body").pushContainer("body", t.returnStatement(t.cloneNode(uid)));
        loop.setData("expressionReplacementReturnUid", uid);
      } else {
        uid = t.identifier(uid.name);
      }

      path.get("expression").replaceWith(t.assignmentExpression("=", t.cloneNode(uid), path.node.expression));
    } else {
      path.replaceWith(t.returnStatement(path.node.expression));
    }
  }

  const callee = this.get("callee");
  callee.arrowFunctionToExpression();

  if (isParentAsync && _index.default.hasType(this.get("callee.body").node, "AwaitExpression", t.FUNCTION_TYPES)) {
    callee.set("async", true);
    this.replaceWith(t.awaitExpression(this.node));
  }

  return callee.get("body.body");
}