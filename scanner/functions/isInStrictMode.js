function isInStrictMode() {
  const start = this.isProgram() ? this : this.parentPath;
  const strictParent = start.find(path => {
    if (path.isProgram({
      sourceType: "module"
    })) return true;
    if (path.isClass()) return true;
    if (!path.isProgram() && !path.isFunction()) return false;

    if (path.isArrowFunctionExpression() && !path.get("body").isBlockStatement()) {
      return false;
    }

    let {
      node
    } = path;
    if (path.isFunction()) node = node.body;

    for (const directive of node.directives) {
      if (directive.value.value === "use strict") {
        return true;
      }
    }
  });
  return !!strictParent;
}