function __storageSave(appKey, theme) {
    const key = __storageKey(appKey);
    window.localStorage[key] = JSON.stringify(theme);
  }