function replaceInline(nodes) {
  this.resync();

  if (Array.isArray(nodes)) {
    if (Array.isArray(this.container)) {
      nodes = this._verifyNodeList(nodes);

      const paths = this._containerInsertAfter(nodes);

      this.remove();
      return paths;
    } else {
      return this.replaceWithMultiple(nodes);
    }
  } else {
    return this.replaceWith(nodes);
  }
}