function lookForBinder(node) {
  for (let i = 0; i < defaultBinders.length; i++) {
    const binder = defaultBinders[i].call(node, node);
    if (binder) {
      return binder;
    }
  }

  return undefined;
}