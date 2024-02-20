function setStorageItem(source, storage, key, value) {
        try {
          storage.setItem(key, value);
        } catch (e) {
          var message = "Unable to set sessionStorage item due to: ".concat(e.message);
          logMessage(source, message);
        }
      }