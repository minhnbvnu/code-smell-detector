function setSessionStorageItem$1(source, key, value) {
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
        sessionStorage = _window.sessionStorage;
      if (validValue === '$remove$') {
        removeStorageItem(source, sessionStorage, key);
      } else {
        setStorageItem(source, sessionStorage, key, validValue);
      }
      hit(source);
    }