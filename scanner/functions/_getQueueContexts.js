function _getQueueContexts() {
  let path = this;
  let contexts = this.contexts;

  while (!contexts.length) {
    path = path.parentPath;
    if (!path) break;
    contexts = path.contexts;
  }

  return contexts;
}