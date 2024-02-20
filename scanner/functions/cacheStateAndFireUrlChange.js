function cacheStateAndFireUrlChange() {
    pendingLocation = null;
    cacheState();
    fireUrlChange();
  }