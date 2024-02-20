function _replaceWith(node) {
  if (!this.container) {
    throw new ReferenceError("Container is falsy");
  }

  if (this.inList) {
    t.validate(this.parent, this.key, [node]);
  } else {
    t.validate(this.parent, this.key, node);
  }

  this.debug(`Replace with ${node == null ? void 0 : node.type}`);
  this.node = this.container[this.key] = node;
}