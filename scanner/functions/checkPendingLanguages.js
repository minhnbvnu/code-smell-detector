function checkPendingLanguages() {
    if (!pendingLanguages) {
      win.setTimeout(onLangsLoaded, 0);
    }
  }