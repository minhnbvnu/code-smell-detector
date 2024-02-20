function inType() {
  let path = this;

  while (path) {
    for (const type of arguments) {
      if (path.node.type === type) return true;
    }

    path = path.parentPath;
  }

  return false;
}