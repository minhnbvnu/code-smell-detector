function _callRemovalHooks() {
  for (const fn of _removalHooks.hooks) {
    if (fn(this, this.parentPath)) return true;
  }
}