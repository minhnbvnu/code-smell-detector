function arrowFunctionToExpression({
  allowInsertArrow = true,
  specCompliant = false
} = {}) {
  if (!this.isArrowFunctionExpression()) {
    throw this.buildCodeFrameError("Cannot convert non-arrow function to a function expression.");
  }

  const thisBinding = hoistFunctionEnvironment(this, specCompliant, allowInsertArrow);
  this.ensureBlock();
  this.node.type = "FunctionExpression";

  if (specCompliant) {
    const checkBinding = thisBinding ? null : this.parentPath.scope.generateUidIdentifier("arrowCheckId");

    if (checkBinding) {
      this.parentPath.scope.push({
        id: checkBinding,
        init: t.objectExpression([])
      });
    }

    this.get("body").unshiftContainer("body", t.expressionStatement(t.callExpression(this.hub.addHelper("newArrowCheck"), [t.thisExpression(), checkBinding ? t.identifier(checkBinding.name) : t.identifier(thisBinding)])));
    this.replaceWith(t.callExpression(t.memberExpression((0, _helperFunctionName.default)(this, true) || this.node, t.identifier("bind")), [checkBinding ? t.identifier(checkBinding.name) : t.thisExpression()]));
  }
}