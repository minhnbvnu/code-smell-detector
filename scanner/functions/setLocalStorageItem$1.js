function setLocalStorageItem$1(source, key, value) {
      if (typeof key === 'undefined') {
        logMessage(source, 'Item key should be specified.');
        return;
      }
      var validValue;
      try {
        validValue = getLimitedStorageItemValue(value);
      } catch (_unused) {
        logMessage(source, "Invalid storage item value: '".concat(value, "'"));
        return;
      }
      var _window = window,
        localStorage = _window.localStorage;
      if (validValue === '$remove$') {
        removeStorageItem(source, localStorage, key);
      } else {
        setStorageItem(source, localStorage, key, validValue);
      }
      hit(source);
    }