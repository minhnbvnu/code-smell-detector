function trustedSetLocalStorageItem$1(source, key, value) {
      if (typeof key === 'undefined') {
        logMessage(source, 'Item key should be specified');
        return;
      }
      if (typeof value === 'undefined') {
        logMessage(source, 'Item value should be specified');
        return;
      }
      var parsedValue = parseKeywordValue(value);
      var _window = window,
        localStorage = _window.localStorage;
      setStorageItem(source, localStorage, key, parsedValue);
      hit(source);
    }