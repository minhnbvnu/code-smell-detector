function useLocalStorageWithLog(key, initialValue) {
  return useLocalStorage(key, initialValue, (v, k) => {
    Object(Logger["a" /* logEvent */])({
      event_name: 'settings-changed',
      metadata: {
        source: 'localStorage setter',
        key: k,
        value: v
      }
    });
  });
}