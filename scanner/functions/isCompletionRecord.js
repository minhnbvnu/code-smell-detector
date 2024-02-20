function isCompletionRecord(allowInsideFunction) {
  let path = this;
  let first = true;

  do {
    const container = path.container;

    if (path.isFunction() && !first) {
      return !!allowInsideFunction;
    }

    first = false;

    if (Array.isArray(container) && path.key !== container.length - 1) {
      return false;
    }
  } while ((path = path.parentPath) && !path.isProgram());

  return true;
}