function removeStorageItem(source, storage, key) {
        try {
          if (key.startsWith("/") && (key.endsWith("/") || key.endsWith("/i")) && isValidStrPattern(key)) {
            var regExpKey = toRegExp(key);
            var storageKeys = Object.keys(storage);
            storageKeys.forEach(function (storageKey) {
              if (regExpKey.test(storageKey)) {
                storage.removeItem(storageKey);
              }
            });
          } else {
            storage.removeItem(key);
          }
        } catch (e) {
          var message = "Unable to remove storage item due to: ".concat(e.message);
          logMessage(source, message);
        }
      }