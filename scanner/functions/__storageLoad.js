function __storageLoad(appKey) {
    const key = __storageKey(appKey);
    const theme = window.localStorage[key];
    return theme ? JSON.parse(theme) : null;
  }