function onScopeDispose(fn) {
    if (activeEffectScope) {
      activeEffectScope.cleanups.push(fn);
    } else {
      warn$1(
        `onScopeDispose() is called when there is no active effect scope to be associated with.`
      );
    }
  }