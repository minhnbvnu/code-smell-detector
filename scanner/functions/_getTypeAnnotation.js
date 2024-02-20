function _getTypeAnnotation() {
  var _inferer;

  const node = this.node;

  if (!node) {
    if (this.key === "init" && this.parentPath.isVariableDeclarator()) {
      const declar = this.parentPath.parentPath;
      const declarParent = declar.parentPath;

      if (declar.key === "left" && declarParent.isForInStatement()) {
        return t.stringTypeAnnotation();
      }

      if (declar.key === "left" && declarParent.isForOfStatement()) {
        return t.anyTypeAnnotation();
      }

      return t.voidTypeAnnotation();
    } else {
      return;
    }
  }

  if (node.typeAnnotation) {
    return node.typeAnnotation;
  }

  let inferer = inferers[node.type];

  if (inferer) {
    return inferer.call(this, node);
  }

  inferer = inferers[this.parentPath.type];

  if ((_inferer = inferer) == null ? void 0 : _inferer.validParent) {
    return this.parentPath.getTypeAnnotation();
  }
}