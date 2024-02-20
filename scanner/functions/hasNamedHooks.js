function hasNamedHooks(hooksTree) {
  for (let i = 0; i < hooksTree.length; i++) {
    const hook = hooksTree[i];

    if (!isUnnamedBuiltInHook(hook)) {
      return true;
    }

    if (hook.subHooks.length > 0) {
      if (hasNamedHooks(hook.subHooks)) {
        return true;
      }
    }
  }

  return false;
}