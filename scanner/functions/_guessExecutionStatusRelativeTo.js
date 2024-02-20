function _guessExecutionStatusRelativeTo(target) {
  const funcParent = {
    this: getOuterFunction(this),
    target: getOuterFunction(target)
  };

  if (funcParent.target.node !== funcParent.this.node) {
    return this._guessExecutionStatusRelativeToDifferentFunctions(funcParent.target);
  }

  const paths = {
    target: target.getAncestry(),
    this: this.getAncestry()
  };
  if (paths.target.indexOf(this) >= 0) return "after";
  if (paths.this.indexOf(target) >= 0) return "before";
  let commonPath;
  const commonIndex = {
    target: 0,
    this: 0
  };

  while (!commonPath && commonIndex.this < paths.this.length) {
    const path = paths.this[commonIndex.this];
    commonIndex.target = paths.target.indexOf(path);

    if (commonIndex.target >= 0) {
      commonPath = path;
    } else {
      commonIndex.this++;
    }
  }

  if (!commonPath) {
    throw new Error("Internal Babel error - The two compared nodes" + " don't appear to belong to the same program.");
  }

  if (isExecutionUncertainInList(paths.this, commonIndex.this - 1) || isExecutionUncertainInList(paths.target, commonIndex.target - 1)) {
    return "unknown";
  }

  const divergence = {
    this: paths.this[commonIndex.this - 1],
    target: paths.target[commonIndex.target - 1]
  };

  if (divergence.target.listKey && divergence.this.listKey && divergence.target.container === divergence.this.container) {
    return divergence.target.key > divergence.this.key ? "before" : "after";
  }

  const keys = t.VISITOR_KEYS[commonPath.type];
  const keyPosition = {
    this: keys.indexOf(divergence.this.parentKey),
    target: keys.indexOf(divergence.target.parentKey)
  };
  return keyPosition.target > keyPosition.this ? "before" : "after";
}