function _resyncParent() {
  if (this.parentPath) {
    this.parent = this.parentPath.node;
  }
}