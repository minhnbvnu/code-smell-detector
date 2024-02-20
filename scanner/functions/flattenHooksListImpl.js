function flattenHooksListImpl(hooksTree, hooksList) {
  for (let i = 0; i < hooksTree.length; i++) {
    const hook = hooksTree[i];

    if (isUnnamedBuiltInHook(hook)) {
      // No need to load source code or do any parsing for unnamed hooks.
      if (react_devtools_shared_src_constants__WEBPACK_IMPORTED_MODULE_0__[/* __DEBUG__ */ "F"]) {
        console.log('flattenHooksListImpl() Skipping unnamed hook', hook);
      }

      continue;
    }

    hooksList.push(hook);

    if (hook.subHooks.length > 0) {
      flattenHooksListImpl(hook.subHooks, hooksList);
    }
  }
}